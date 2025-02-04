import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { Poa1Model } from "../models/Poa1Model.js";
import { Errorhandler } from "../utils/errorHandler.js";
import { uploadFile } from "../utils/uploadFile.js";

// Function to get the next available ID for the new POA
const getNewId = async () => {
  try {
    const maxDoc = await Poa1Model.aggregate([
      {
        $addFields: {
          numericId: { $toInt: "$id" },
        },
      },
      {
        $sort: { numericId: -1 },
      },
      {
        $limit: 1,
      },
    ]).exec();

    const maxId = maxDoc.length > 0 ? maxDoc[0].numericId : 0;
    return maxId + 1;
  } catch (error) {
    return next(new Errorhandler("failed to get new id", 500));
  }
};

// Create a new POA1 (or append if it already exists for that month)
export const createPoa1 = CatchAsyncError(async (req, res, next) => {
  try {
    const { poa2_created_at } = req.query;
    const poaData = Object.keys(req.body)
      .filter((key) => key.startsWith("poaData"))
      .reduce((acc, key) => {
        const [, index, field] = key.match(/poaData\[(\d+)\]\[(\w+)\]/);
        acc[index] = acc[index] || {};
        acc[index][field] = req.body[key];
        return acc;
      }, {});

    const user_id = req?.user?.id;

    // Extract the new POA1 data to be checked for duplicates
    const newEntries = Object.values(poaData);

    // Determine the month and year for the new entries (assuming all entries have the same month)
    const [entryDay, entryMonth, entryYear] = newEntries[0].date
      .split("/")
      .map(Number);

    // Find an existing document for the same user and month
    let poa1 = await Poa1Model.findOne({
      user_id,
      $expr: {
        $and: [
          { $eq: [{ $month: "$created_at" }, entryMonth] },
          { $eq: [{ $year: "$created_at" }, entryYear] },
        ],
      },
    });

    // If a document exists, find any duplicate entries
    let existingCombinations = new Set();
    if (poa1) {
      existingCombinations = new Set(
        poa1.poaData.map(
          (item) => `${item.date}-${item.plan}-${item.action}-${item.dist_id}`
        )
      );
    }

    // Filter out new entries that match the existing combinations
    const filteredEntries = newEntries.filter(
      (entry) =>
        !existingCombinations.has(
          `${entry.date}-${entry.plan}-${entry.action}-${entry.dist_id}`
        )
    );

    if (filteredEntries.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No new data to add! Duplicate entries found.",
      });
    }

    // Process and upload photos if any
    for (const [index, entry] of Object.entries(poaData)) {
      const photoKey = `poaData[${index}][photo]`;
      if (req.files && req.files[photoKey]) {
        const photoBuffer = req.files[photoKey].data;
        const result = await uploadFile(photoBuffer);
        poaData[index].photo = result;
      }
    }

    // Update existing document or create a new one based on the month
    if (poa1) {
      // Append new filtered entries to the existing document
      poa1.poaData.push(...filteredEntries);
      poa1.status = "1";
      poa1.poa2_created_at = poa2_created_at;
      await poa1.save();
    } else {
      // Create a new document for this month
      poa1 = new Poa1Model({
        id: (await getNewId()).toString(),
        user_id,
        status: "1",
        poaData: filteredEntries,
        poa2_created_at,
        created_at: req.query.created_at, // Ensure created_at is set (if passed in query)
      });
      await poa1.save();
    }

    res.status(201).json({
      success: true,
      message: "POA2 data successfully saved",
      data: poa1,
    });
  } catch (error) {
    console.error(error);
    next(new Errorhandler("Failed to submit POA Data", 500));
  }
});

// Get all POA1 documents for the logged-in user
export const getPoa1s = CatchAsyncError(async (req, res, next) => {
  try {
    const poa1Data = await Poa1Model.find({ user_id: req?.user?.id });
    res.status(200).json({ success: true, data: poa1Data });
  } catch (error) {
    console.error(error);
    next(new Errorhandler("Failed to get POA Data", 500));
  }
});

// Get a single POA1 record by ID (plus optional poaType filtering)
export const getPoalData = CatchAsyncError(async (req, res, next) => {
  try {
    const { poaType } = req.query;
    const filter = {
      id: req.params.id,
      "poaData.poaType": "poa1",
    };
    if (poaType) {
      filter["poaData.poaType"] = poaType;
    }

    const poa1Data = await Poa1Model.aggregate([
      {
        $unwind: {
          path: "$poaData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: filter,
      },
      {
        $addFields: {
          poaDateObj: {
            $dateFromString: {
              dateString: "$poaData.date",
              format: "%d/%m/%Y",
            },
          },
        },
      },
      {
        $sort: {
          poaDateObj: 1,
        },
      },
      {
        $lookup: {
          from: "soeprstates",
          localField: "poaData.state_id",
          foreignField: "id",
          as: "state",
        },
      },
      {
        $lookup: {
          from: "soeprdistricts",
          localField: "poaData.dist_id",
          foreignField: "id",
          as: "district",
        },
      },
      {
        $addFields: {
          "poaData.state": {
            $arrayElemAt: ["$state", 0], // Ensure that the correct state is associated
          },
          "poaData.district": {
            $arrayElemAt: ["$district", 0], // Ensure that the correct district is associated
          },
        },
      },
      {
        $group: {
          _id: "$_id",
          id: { $first: "$id" },
          user_id: { $first: "$user_id" },
          poa1_approval_status: { $first: "$poa1_approval_status" }, // Added
          poa1_remarks: { $first: "$poa1_remarks" }, // Added
          poa1_approval_date: { $first: "$poa1_approval_date" }, // Added
          poa2_approval_status: { $first: "$poa2_approval_status" }, // Added
          poa2_remarks: { $first: "$poa2_remarks" }, // Added
          poa2_approval_date: { $first: "$poa2_approval_date" }, // Added
          poaData: { $push: "$poaData" },
          created_at: { $first: "$created_at" },
          modified_at: { $first: "$modified_at" },
        },
      },
    ]);

    if (!poa1Data || poa1Data.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No POA1 Data Found" });
    }
    res.status(200).json({ success: true, data: poa1Data[0] });
  } catch (error) {
    console.error(error);
    next(new Errorhandler("Failed to get POA Data", 500));
  }
});

// Fetch state-wise POA1 data (for Admin)
export const getPoa1DataByState = CatchAsyncError(async (req, res, next) => {
  try {
    const { state_id, user_id, month, year, poaType = "poa1" } = req.query;

    const poa1Data = await Poa1Model.aggregate([
      {
        $unwind: {
          path: "$poaData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          poaMonth: {
            $month: {
              $dateFromString: {
                dateString: "$poaData.date",
                format: "%d/%m/%Y",
              },
            },
          },
          poaYear: {
            $year: {
              $dateFromString: {
                dateString: "$poaData.date",
                format: "%d/%m/%Y",
              },
            },
          },
          poaDateObj: {
            $dateFromString: {
              dateString: "$poaData.date",
              format: "%d/%m/%Y",
            },
          },
        },
      },
      {
        $match: {
          poaMonth: parseInt(month),
          poaYear: parseInt(year),
          "poaData.state_id": state_id,
          "poaData.poaType": poaType,
          user_id: user_id,
        },
      },
      {
        $sort: {
          poaDateObj: 1,
        },
      },
      {
        $lookup: {
          from: "soeprstates",
          localField: "poaData.state_id",
          foreignField: "id",
          as: "stateDetails",
        },
      },
      {
        $lookup: {
          from: "soeprdistricts",
          localField: "poaData.dist_id",
          foreignField: "id",
          as: "districtDetails",
        },
      },
      {
        $addFields: {
          "poaData.state": {
            $arrayElemAt: ["$stateDetails", 0],
          },
          "poaData.district": {
            $arrayElemAt: ["$districtDetails", 0],
          },
        },
      },
      {
        $group: {
          _id: "$_id",
          id: { $first: "$id" },
          user_id: { $first: "$user_id" },
          poa1_approval_status: { $first: "$poa1_approval_status" }, // Added
          poa1_remarks: { $first: "$poa1_remarks" }, // Added
          poa1_approval_date: { $first: "$poa1_approval_date" }, // Added
          poa2_approval_status: { $first: "$poa2_approval_status" }, // Added
          poa2_remarks: { $first: "$poa2_remarks" }, // Added
          poa2_approval_date: { $first: "$poa2_approval_date" }, // Added
          poaData: { $push: "$poaData" },
          created_at: { $first: "$created_at" },
          modified_at: { $first: "$modified_at" },
        },
      },
      {
        $project: {
          stateDetails: 0,
          districtDetails: 0,
        },
      },
    ]);

    if (!poa1Data || poa1Data.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No POA1 Data Found for this State" });
    }

    res.status(200).json({ success: true, data: poa1Data[0] });
  } catch (error) {
    console.error(error);
    next(new Errorhandler("Failed to Get POA Data", 500));
  }
});

// Fetch all POA1 data for Super Admin (filter by month/year)
export const getAllPoa1Data = CatchAsyncError(async (req, res, next) => {
  try {
    const { month, year, poaType = "poa1" } = req.query;

    if (!month || !year) {
      return res
        .status(400)
        .json({ success: false, message: "Month and Year are required" });
    }

    const poa1Data = await Poa1Model.aggregate([
      {
        $unwind: {
          path: "$poaData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          poaMonth: {
            $month: {
              $dateFromString: {
                dateString: "$poaData.date",
                format: "%d/%m/%Y",
              },
            },
          },
          poaYear: {
            $year: {
              $dateFromString: {
                dateString: "$poaData.date",
                format: "%d/%m/%Y",
              },
            },
          },
        },
      },
      {
        $match: {
          poaMonth: parseInt(month),
          poaYear: parseInt(year),
          "poaData.poaType": poaType,
        },
      },
      {
        $lookup: {
          from: "soeprstates",
          localField: "poaData.state_id",
          foreignField: "id",
          as: "state",
        },
      },
      {
        $addFields: {
          "poaData.state": {
            $arrayElemAt: ["$state", 0], // Ensure that the correct state is associated
          },
        },
      },
      {
        $group: {
          _id: "$_id",
          id: { $first: "$id" },
          user_id: { $first: "$user_id" },
          poa1_approval_status: { $first: "$poa1_approval_status" }, // Added
          poa1_remarks: { $first: "$poa1_remarks" }, // Added
          poa1_approval_date: { $first: "$poa1_approval_date" }, // Added
          poa2_approval_status: { $first: "$poa2_approval_status" }, // Added
          poa2_remarks: { $first: "$poa2_remarks" }, // Added
          poa2_approval_date: { $first: "$poa2_approval_date" }, // Added
          poaData: { $push: "$poaData" },
          created_at: { $first: "$created_at" },
          modified_at: { $first: "$modified_at" },
        },
      },
    ]);

    if (!poa1Data || poa1Data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No POA1 Data Found for the specified month and year",
      });
    }
    res.status(200).json({ success: true, data: poa1Data });
  } catch (error) {
    next(new Errorhandler("Failed to Retrieve POA Data", 500));
  }
});

// Update POA1 data (includes approval logic)
export const updatePoa1Data = CatchAsyncError(async (req, res, next) => {
  try {
    const { poaId } = req.params;
    // EXTRACT approval_status and remarks from request body
    const {
      poa1_approval_status,
      poa1_remarks,
      poa2_approval_status,
      poa2_remarks,
    } = req.body;

    const poaData = Object.keys(req.body)
      .filter((key) => key.startsWith("poaData"))
      .reduce((acc, key) => {
        const [, dateIndex, entryIndex, field] = key.match(
          /poaData\[(\d+)\]\[(\d+)\]\[(\w+)\]/
        );
        acc[dateIndex] = acc[dateIndex] || [];
        acc[dateIndex][entryIndex] = acc[dateIndex][entryIndex] || {};
        acc[dateIndex][entryIndex][field] = req.body[key];
        return acc;
      }, {});

    const user_id = req?.user?.id;
    let poa1 = await Poa1Model.findOne({ id: poaId });

    if (!poa1) {
      return res.status(404).json({
        success: false,
        message: "POA1 data not found",
      });
    }

    // PERMISSION CHECK: either the POA owner or a Senior Consultant (role=5).
    // If you also want Admin (role=2) to approve, add req.user.role !== 2 check.
    if (
      poa1.user_id !== user_id &&
      req.user.role !== 5 &&
      req.user.role !== 7
    ) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to approve this POA.",
      });
    }

    // Update day-wise data if present
    for (const [dateIndex, entries] of Object.entries(poaData)) {
      for (const [entryIndex, entry] of entries.entries()) {
        const incomingDate = entry.date;
        const incomingStateId = entry.state_id;
        const incomingDistId = entry.dist_id;
        const incomingAction = entry.action;

        // Find if there's an existing entry that matches date/state_id/dist_id/action
        const existingEntryIndex = poa1.poaData.findIndex((item) => {
          return (
            item.date === incomingDate &&
            item.state_id === incomingStateId &&
            item.dist_id === incomingDistId &&
            item.action === incomingAction
          );
        });

        // Handle file uploads if any
        const photoKey = `poaData[${dateIndex}][${entryIndex}][photo]`;
        if (req.files && req.files[photoKey]) {
          const photoBuffer = req.files[photoKey].data;
          const result = await uploadFile(photoBuffer);
          entry.photo = result;
        }

        if (existingEntryIndex !== -1) {
          // Update existing entry
          poa1.poaData[existingEntryIndex] = {
            ...poa1.poaData[existingEntryIndex],
            ...entry,
          };
        } else {
          // Add new entry
          poa1.poaData.push({ ...entry });
        }
      }
    }

    // Handle POA1-specific approval logic
if (poa1_approval_status) {
  poa1.poa1_approval_status = poa1_approval_status;
  poa1.poa1_remarks = poa1_remarks || "";

  // Whenever status is 1 or 2, set the same approval_date
  if (poa1_approval_status === "1" || poa1_approval_status === "2") {
    poa1.poa1_approval_date = new Date();
  }

  // If you also want a separate "revert date" for status=2, uncomment below
  // if (poa1_approval_status === "2") {
  //   poa1.poa1_revert_date = new Date();
  // }

  // Keep track of who approved
  poa1.approved_by = user_id;
}

// Handle POA2-specific approval logic
if (poa2_approval_status) {
  poa1.poa2_approval_status = poa2_approval_status;
  poa1.poa2_remarks = poa2_remarks || "";

  // Whenever status is 1 or 2, set the same approval_date
  if (poa2_approval_status === "1" || poa2_approval_status === "2") {
    poa1.poa2_approval_date = new Date();
  }

  // If you also want a separate "revert date" for status=2, uncomment below
  // if (poa2_approval_status === "2") {
  //   poa1.poa2_revert_date = new Date();
  // }

  // Keep track of who approved
  poa1.approved_by = user_id;
}

    // Update overall status based on approval statuses
    if (poa1_approval_status === "1" && poa2_approval_status === "1") {
      poa1.status = "1"; 
    } else if (poa1_approval_status === "2" || poa2_approval_status === "2") {
      poa1.status = "2";
    } else {
      poa1.status = "0";
    }

    await poa1.save();

    return res.status(200).json({
      success: true,
      message: "POA data successfully updated",
      data: poa1,
    });
  } catch (error) {
    console.error(error);
    next(new Errorhandler("Failed to Update POA Data", 500));
  }
});
