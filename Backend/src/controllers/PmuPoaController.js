import { PmupoaModel } from "../models/PmuPoaModel.js";
import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { Errorhandler } from "../utils/errorHandler.js";

const getNewId = async () => {
  try {
    const maxDoc = await PmupoaModel.aggregate([
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

// Utility to check for duplicate entries
const filterDuplicateEntries = (existingEntries, newEntries) => {
  const existingCombinations = new Set(
    existingEntries.map(
      (item) => `${item.date}-${item.plannedEvent}-${item.target}`
    )
  );
  return newEntries.filter(
    (entry) =>
      !existingCombinations.has(
        `${entry.date}-${entry.plannedEvent}-${entry.target}`
      )
  );
};

// Create new POA entry
export const createPmupoa = CatchAsyncError(async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const { poaData } = req.body;

    if (!Array.isArray(poaData) || poaData.length === 0) {
      return next(new Errorhandler("POA data must be a non-empty array.", 400));
    }
    console.log(user_id);

    const existingEntry = await PmupoaModel.findOne({ user_id });
    const filteredEntries = filterDuplicateEntries(
      existingEntry?.poaData || [],
      poaData
    );

    if (filteredEntries.length === 0) {
      return res
        .status(400)
        .json({ message: "No new data to add! Duplicate entries found." });
    }

    if (existingEntry) {
      existingEntry.poaData.push(...filteredEntries);
      await existingEntry.save();
    } else {
      const newPmupoa = new PmupoaModel({
        id: (await getNewId()).toString(),
        user_id,
        poaData: filteredEntries,
      });
      await newPmupoa.save();
    }

    res
      .status(201)
      .json({ success: true, message: "POA entry created successfully." });
  } catch (error) {
    console.log(error);

    next(new Errorhandler("Failed to create POA entry.", 500));
  }
});

// Fetch all POA data for admin access
export const getAllPmupoaData = CatchAsyncError(async (req, res, next) => {
  try {
    const poas = await PmupoaModel.find();
    res.status(200).json({ success: true, data: poas });
  } catch (error) {
    console.log(error);

    next(new Errorhandler("Failed to fetch all POA data.", 500));
  }
});

// Fetch user-specific POA data
export const getPmupoaData = CatchAsyncError(async (req, res, next) => {
  try {
    // const { user_id } = req.user;
    const { poaType = "poa1" } = req.query;
    const filter = {
      id: req.params.id,
      "poaData.poaType": "poa1",
    };
    if (poaType) {
      filter["poaData.poaType"] = poaType;
    }
    const poaEntries = await PmupoaModel.aggregate([
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

    if (!poaEntries.length) {
      return res
        .status(404)
        .json({ message: "No POA data found for the user." });
    }

    res.status(200).json({ success: true, data: poaEntries[0] });
  } catch (error) {
    next(new Errorhandler("Failed to fetch POA data.", 500));
  }
});

// Update a specific POA entry
export const updatePmupoaData = CatchAsyncError(async (req, res, next) => {
  try {
    const { poaId } = req.params;
    const { poaData } = req.body;

    if (!Array.isArray(poaData) || poaData.length === 0) {
      return next(new Errorhandler("Invalid POA data provided.", 400));
    }

    const poaEntry = await PmupoaModel.findOne({ id: poaId });
    if (!poaEntry) {
      return res.status(404).json({ message: "POA entry not found." });
    }

    const filteredEntries = filterDuplicateEntries(poaEntry.poaData, poaData);
    poaEntry.poaData.push(...filteredEntries);
    await poaEntry.save();

    res
      .status(200)
      .json({ success: true, message: "POA entry updated successfully." });
  } catch (error) {
    next(new Errorhandler("Failed to update POA entry.", 500));
  }
});
