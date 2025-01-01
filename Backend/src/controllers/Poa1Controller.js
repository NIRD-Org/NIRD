import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { Poa1Model } from "../models/Poa1Model.js";
import { Errorhandler } from "../utils/errorHandler.js";
import { uploadFile } from "../utils/uploadFile.js";

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

// export const createPoa1 = CatchAsyncError(async (req, res, next) => {
//   try {
//     const { poa2_created_at } = req.query;
//     const poaData = Object.keys(req.body)
//       .filter((key) => key.startsWith("poaData"))
//       .reduce((acc, key) => {
//         const [, index, field] = key.match(/poaData\[(\d+)\]\[(\w+)\]/);
//         acc[index] = acc[index] || {};
//         acc[index][field] = req.body[key];
//         return acc;
//       }, {});

//     const user_id = req?.user?.id;

//     // Extract the new POA1 data to be checked for duplicates
//     const newEntries = Object.values(poaData);

//     // Find existing entries across all documents for the same user
//     const existingEntries = await Poa1Model.find({
//       user_id,
//       "poaData.date": { $in: newEntries.map((entry) => entry.date) },
//     });

//     // Create a set of unique combinations of (date, plan, action, dist_id) from existing entries
//     const existingCombinations = new Set(
//       existingEntries.flatMap((doc) =>
//         doc.poaData.map(
//           (item) => `${item.date}-${item.plan}-${item.action}-${item.dist_id}`
//         )
//       )
//     );

//     // Filter out new entries that match the existing combinations
//     const filteredEntries = newEntries.filter(
//       (entry) =>
//         !existingCombinations.has(
//           `${entry.date}-${entry.plan}-${entry.action}-${entry.dist_id}`
//         )
//     );

//     if (filteredEntries.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "No new data to add! Duplicate entries found.",
//       });
//     }

//     for (const [index, entry] of Object.entries(poaData)) {
//       const photoKey = `poaData[${index}][photo]`;

//       if (req.files && req.files[photoKey]) {
//         const photoBuffer = req.files[photoKey].data;
//         const result = await uploadFile(photoBuffer);
//         poaData[index].photo = result.secure_url;
//       }
//     }

//     let poa1 = await Poa1Model.findOne({ user_id });

//     if (poa1) {
//       poa1.poaData.push(...filteredEntries);
//       poa1.status = "1";
//       poa1.poa2_created_at = poa2_created_at;
//       await poa1.save();
//     } else {
//       poa1 = new Poa1Model({
//         id: (await getNewId()).toString(),
//         user_id,
//         status: "1",
//         poaData: filteredEntries,
//         poa2_created_at,
//       });
//       await poa1.save();
//     }

//     res.status(201).json({
//       success: true,
//       message: "POA1 data successfully saved",
//       data: poa1,
//     });
//   } catch (error) {
//     console.error(error);
//     next(new Errorhandler("Failed to submit POA1 Data", 500));
//   }
// });

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
        created_at: req.query.created_at, // Ensure created_at is set correctly
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

// export const getPoa1s = CatchAsyncError(async (req, res, next) => {
//   try {
//     const poa1Data = await Poa1Model.find({ user_id: req?.user?.id });

//     res.status(200).json({ success: true, data: poa1Data });
//   } catch (error) {
//     console.error(error);
//     next(new Errorhandler("Failed to get POA Data", 500));
//   }
// });

export const getPoa1s = CatchAsyncError(async (req, res, next) => {
  try {
    const poa1Data = await Poa1Model.find({ user_id: req?.user?.id });

    // Add poaSubmitted field to each object in poa1Data
    const updatedPoa1Data = poa1Data.map((item) => {
      const types = { poa1: false, poa2: false };

      if (item.poaData.some((poa) => poa.poaType === "poa1")) {
        types.poa1 = true;
      }
      if (item.poaData.some((poa) => poa.poaType === "poa2")) {
        types.poa2 = true;
      }

      return {
        ...item._doc,
        poaSubmitted: types,
      };
    });

    res.status(200).json({ success: true, data: updatedPoa1Data });
  } catch (error) {
    console.error(error);
    next(new Errorhandler("Failed to get POA Data", 500));
  }
});


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
          status: { $first: "$status" },
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

// Get the state wise data ---- Admin

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
          user_id: { $first: "$user_id" },
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

// Get all poa1 data --- Super admin
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
          status: { $first: "$status" },
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

export const updatePoa1Data = CatchAsyncError(async (req, res, next) => {
  try {
    const { poaId } = req.params;
    
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
        message: "POA1 data not found for the user",
      });
    }

    // Go inside the poaData entries
    for (const [dateIndex, entries] of Object.entries(poaData)) {
      for (const [entryIndex, entry] of entries.entries()) {
        const incomingDate = entry.date; // date from the request
        const incomingStateId = entry.state_id;
        const incomingDistId = entry.dist_id;
        const incomingAction = entry.action;

        // Find the existing entry in poaData with matching date, state_id, and dist_id
        const existingEntryIndex = poa1.poaData.findIndex((item) => {
          return (
            item.date === incomingDate &&
            item.state_id === incomingStateId &&
            item.dist_id === incomingDistId &&
            item.action === incomingAction
          );
        });

        const photoKey = `poaData[${dateIndex}][${entryIndex}][photo]`;

        // Handle file uploads if any
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
          poa1.poaData.push({
            ...entry,
          });
        }
      }
    }

    poa1.status = "1";
    await poa1.save();

    res.status(200).json({
      success: true,
      message: "POA data successfully updated",
      data: poa1,
    });
  } catch (error) {
    console.error(error);
    next(new Errorhandler("Failed to Update POA Data", 500));
  }
});
