import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { YfPoa1Model } from "../models/YfPoa1Model.js";
import { Errorhandler } from "../utils/errorHandler.js";
import { uploadFile } from "../utils/uploadFile.js";

const getNewId = async () => {
  try {
    const maxDoc = await YfPoa1Model.aggregate([
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
//     const { created_at } = req.query;
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

//     // Determine the month and year for the new entries (assuming all entries have the same month)
//     const [entryDay, entryMonth, entryYear] = newEntries[0].date
//       .split("/")
//       .map(Number);

//     // Find an existing document for the same user and month
//     let poa1 = await YfPoa1Model.findOne({
//       user_id,
//       $expr: {
//         $and: [
//           { $eq: [{ $month: "$created_at" }, entryMonth] },
//           { $eq: [{ $year: "$created_at" }, entryYear] },
//         ],
//       },
//     });

//     // If a document exists, find any duplicate entries
//     let existingCombinations = new Set();
//     if (poa1) {
//       existingCombinations = new Set(
//         poa1.poaData.map((item) => `${item.date}-${item.action}-${item.gp_id}`)
//       );
//     }

//     // Filter out new entries that match the existing combinations
//     const filteredEntries = newEntries.filter(
//       (entry) =>
//         !existingCombinations.has(
//           `${entry.date}-${entry.action}-${entry.gp_id}`
//         )
//     );

//     if (filteredEntries.length === 0) {
//       // console.log();

//       return res.status(400).json({
//         success: false,
//         message: "No new data to add! Duplicate entries found.",
//       });
//     }

//     // Process and upload photos if any
//     for (const [index, entry] of Object.entries(poaData)) {
//       const photoKey = `poaData[${index}][photo]`;

//       if (req.files && req.files[photoKey]) {
//         const photoBuffer = req.files[photoKey].data;
//         const result = await uploadFile(photoBuffer);
//         poaData[index].photo = result;
//       }
//     }

//     // Update existing document or create a new one based on the month
//     if (poa1) {
//       // Append new filtered entries to the existing document
//       poa1.poaData.push(...filteredEntries);
//       poa1.status = "1";
//       await poa1.save();
//     } else {
//       // Create a new document for this month
//       poa1 = new YfPoa1Model({
//         id: (await getNewId()).toString(),
//         user_id,
//         status: "1",
//         poaData: filteredEntries,

//         created_at: created_at ?? new Date(),
//       });
//       await poa1.save();
//     }

//     res.status(201).json({
//       success: true,
//       message: "POA2 data successfully saved",
//       data: poa1,
//     });
//   } catch (error) {
//     console.error(error);
//     next(new Errorhandler("Failed to submit POA Data", 500));
//   }
// });

export const createPoa1 = CatchAsyncError(async (req, res, next) => {
  try {
    const { created_at } = req.query;
    const poaData = Object.keys(req.body)
      .filter((key) => key.startsWith("poaData"))
      .reduce((acc, key) => {
        const [, index, field] = key.match(/poaData\[(\d+)\]\[(\w+)\]/);
        acc[index] = acc[index] || {};

        // Ensure fields are treated as arrays, whether there is one entry or multiple
        const value = Array.isArray(req.body[key])
          ? req.body[key]
          : [req.body[key]];

        acc[index][field] = value;
        return acc;
      }, {});

    const user_id = req?.user?.id;

    const newEntries = [];

    // Convert each field's array into separate objects per entry
    Object.values(poaData).forEach((entryGroup) => {
      const entryCount = entryGroup.date.length;

      for (let i = 0; i < entryCount; i++) {
        // Extract individual entries
        const entry = {
          date: entryGroup.date[i],
          weekday: entryGroup.weekday[i],
          kpi_theme: entryGroup.kpi_theme[i],
          activity: entryGroup.activity[i],
          plannedEvent: entryGroup.plannedEvent[i],
          poaType: entryGroup.poaType[i],
          state_id: entryGroup.state_id[i],
          dist_id: entryGroup.dist_id[i],
          block_id: entryGroup.block_id[i],
          gp_id: entryGroup.gp_id[i],
          achievements: entryGroup.achievements[i] || "",
          tentativeTarget: entryGroup.tentativeTarget[i],
          remarks: entryGroup.remarks[i] || "",
        };

        // Filter out entries with empty gp_id
        if (entry.gp_id) {
          newEntries.push(entry);
        }
      }
    });

    if (newEntries.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid data to add! Either duplicate or missing GP ID.",
      });
    }

    const [entryDay, entryMonth, entryYear] = newEntries[0].date
      .split("/")
      .map(Number);

    // Find an existing document for the same user and month
    let poa1 = await YfPoa1Model.findOne({
      user_id,
      $expr: {
        $and: [
          { $eq: [{ $month: "$created_at" }, entryMonth] },
          { $eq: [{ $year: "$created_at" }, entryYear] },
        ],
      },
    });

    let existingCombinations = new Set();
    if (poa1) {
      existingCombinations = new Set(
        poa1.poaData.map(
          (item) => `${item.date}-${item.activity}-${item.gp_id}`
        )
      );
    }

    // Filter new entries to avoid exact duplicates
    const filteredEntries = newEntries.filter((entry) => {
      // Create a unique key for coparision
      const entryKey = `${entry.date}-${entry.activity}-${entry.gp_id}`;

      // Return entries that don't exist in the current dataset (are not duplicates)
      return !existingCombinations.has(entryKey);
    });

    if (filteredEntries.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No new data to add! Duplicate entries found.",
      });
    }

    if (req.files) {
      for (const fileKey of Object.keys(req.files)) {
        const match = fileKey.match(/poaData\[(\d+)\]\[photo\]/);

        if (match) {
          const dayIndex = match[1]; // Get the day index from the file key

          // Loop through filteredEntries and find the matching entry by day
          for (let i = 0; i < filteredEntries.length; i++) {
            const entryDay = filteredEntries[i].date.split("/")[0];

            // If the entry matches the day index, upload the file and assign the photo
            if (Number(entryDay) === Number(dayIndex) && req.files[fileKey]) {
              const photoBuffer = req.files[fileKey].data;

              const result = await uploadFile(photoBuffer);
              filteredEntries[i].photo = result;
              break;
            }
          }
        }
      }
    }
    // Update existing document or create a new one
    if (poa1) {
      poa1.poaData.push(...filteredEntries);
      poa1.status = "1";
      await poa1.save();
    } else {
      poa1 = new YfPoa1Model({
        id: (await getNewId()).toString(),
        user_id,
        status: "1",
        poaData: filteredEntries,
        created_at: created_at ?? new Date(),
      });
      await poa1.save();
    }

    res.status(201).json({
      success: true,
      message: "POA1 data successfully saved",
      data: poa1,
    });
  } catch (error) {
    console.error(error);
    next(new Errorhandler("Failed to submit POA Data", 500));
  }
});

export const getPoa1s = CatchAsyncError(async (req, res, next) => {
  try {
    const poa1Data = await YfPoa1Model.find({ user_id: req?.user?.id });

    res.status(200).json({ success: true, data: poa1Data });
  } catch (error) {
    console.error(error);
    next(new Errorhandler("Failed to get POA1 Data", 500));
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
    const poa1Data = await YfPoa1Model.aggregate([
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
          from: "states",
          localField: "poaData.state_id",
          foreignField: "id",
          as: "state",
        },
      },
      {
        $lookup: {
          from: "districts",
          localField: "poaData.dist_id",
          foreignField: "id",
          as: "district",
        },
      },
      {
        $lookup: {
          from: "blocks",
          localField: "poaData.block_id",
          foreignField: "id",
          as: "block",
        },
      },
      {
        $lookup: {
          from: "grampanchayats",
          localField: "poaData.gp_id",
          foreignField: "id",
          as: "gp",
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
          "poaData.block": {
            $arrayElemAt: ["$block", 0],
          },
          "poaData.gp": {
            $arrayElemAt: ["$gp", 0],
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

    const poa1Data = await YfPoa1Model.aggregate([
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
          from: "states",
          localField: "poaData.state_id",
          foreignField: "id",
          as: "stateDetails",
        },
      },
      {
        $lookup: {
          from: "districts",
          localField: "poaData.dist_id",
          foreignField: "id",
          as: "districtDetails",
        },
      },
      {
        $lookup: {
          from: "blocks",
          localField: "poaData.block_id",
          foreignField: "id",
          as: "blockDetails",
        },
      },
      {
        $lookup: {
          from: "grampanchayats",
          localField: "poaData.gp_id",
          foreignField: "id",
          as: "gpDetails",
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
          "poaData.block": {
            $arrayElemAt: ["$blockDetails", 0],
          },
          "poaData.gp": {
            $arrayElemAt: ["$gpDetails", 0],
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

export const updatePoa1Data = CatchAsyncError(async (req, res, next) => {
  try {
    const { poaId } = req.params;

    // Extract poaData from the request body
    const poaData = Object.keys(req.body)
      .filter((key) => key.startsWith("poaData"))
      .reduce((acc, key) => {
        const match = key.match(/poaData\[(\d+)\]\[(\d+)\]\[(\w+)\]/);
        if (match) {
          const [, dateIndex, entryIndex, field] = match;
          acc[dateIndex] = acc[dateIndex] || [];
          acc[dateIndex][entryIndex] = acc[dateIndex][entryIndex] || {};
          acc[dateIndex][entryIndex][field] = req.body[key];
        }
        return acc;
      }, {});

    if (!poaData || Object.keys(poaData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid POA data format",
      });
    }

    let poa1 = await YfPoa1Model.findOne({ id: poaId });

    if (!poa1) {
      return res.status(404).json({
        success: false,
        message: "POA1 data not found for the user",
      });
    }

    let dataModified = false;

    // Loop over the poaData entries
    for (const [dateIndex, entries] of Object.entries(poaData)) {
      if (!Array.isArray(entries)) continue;

      for (const [entryIndex, entry] of entries.entries()) {
        const { date, state_id, dist_id, block_id, gp_id, activity } = entry;

        const incomingDate = date;
        const incomingStateId = state_id;
        const incomingDistId = dist_id;
        const incomingBlockId = block_id;
        const incomingGpId = gp_id;
        const incomingActivity = activity;

        // Find the existing entry in poaData with matching fields
        const existingEntryIndex = poa1.poaData.findIndex((item) => {
          return (
            item.date === incomingDate &&
            item.state_id === incomingStateId &&
            item.dist_id === incomingDistId &&
            item.block_id === incomingBlockId &&
            item.gp_id === incomingGpId &&
            item.activity === incomingActivity
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
          poa1.poaData[existingEntryIndex] = Object.assign(
            {},
            poa1.poaData[existingEntryIndex], // existing data
            entry // new data
          );
          dataModified = true;
        } else {
          // Add new entry if no matching entry exists
          poa1.poaData.push({ ...entry });
          dataModified = true;
        }
      }
    }

    if (dataModified) {
      poa1.status = "1"; // Update status to active
      await poa1.save(); // Save the document
    }

    res.status(200).json({
      success: true,
      message: "POA data successfully updated",
      data: poa1,
    });
  } catch (error) {
    console.error("Error during POA update:", error);
    next(new Errorhandler("Failed to Update POA Data", 500));
  }
});
