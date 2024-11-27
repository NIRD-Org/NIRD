import { PmupoaModel } from "../models/PmuPoaModel.js";
import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { Errorhandler } from "../utils/errorHandler.js";

// Utility to check for duplicate entries
const filterDuplicateEntries = (existingEntries, newEntries) => {
  const existingCombinations = new Set(
    existingEntries.map((item) => `${item.date}-${item.plannedEvent}-${item.target}`)
  );
  return newEntries.filter(
    (entry) => !existingCombinations.has(`${entry.date}-${entry.plannedEvent}-${entry.target}`)
  );
};

// Create new POA entry
export const createPmupoa = CatchAsyncError(async (req, res, next) => {
  try {
    const { user_id } = req.user;
    const { poaData } = req.body;

    if (!Array.isArray(poaData) || poaData.length === 0) {
      return next(new Errorhandler("POA data must be a non-empty array.", 400));
    }

    const existingEntry = await PmupoaModel.findOne({ user_id });
    const filteredEntries = filterDuplicateEntries(existingEntry?.poaData || [], poaData);

    if (filteredEntries.length === 0) {
      return res.status(400).json({ message: "No new data to add! Duplicate entries found." });
    }

    if (existingEntry) {
      existingEntry.poaData.push(...filteredEntries);
      await existingEntry.save();
    } else {
      const newPmupoa = new PmupoaModel({
        id: `${user_id}-${Date.now()}`,
        user_id,
        poaData: filteredEntries,
      });
      await newPmupoa.save();
    }

    res.status(201).json({ success: true, message: "POA entry created successfully." });
  } catch (error) {
    next(new Errorhandler("Failed to create POA entry.", 500));
  }
});

// Fetch all POA data for admin access
export const getAllPmupoaData = CatchAsyncError(async (req, res, next) => {
  try {
    const poas = await PmupoaModel.find().populate("user_id", "name email");
    res.status(200).json({ success: true, data: poas });
  } catch (error) {
    next(new Errorhandler("Failed to fetch all POA data.", 500));
  }
});

// Fetch user-specific POA data
export const getPmupoaData = CatchAsyncError(async (req, res, next) => {
  try {
    const { user_id } = req.user;
    const { poaType } = req.query;

    const poaEntries = await PmupoaModel.find({
      user_id,
      "poaData.poaType": poaType,
    });

    if (!poaEntries.length) {
      return res.status(404).json({ message: "No POA data found for the user." });
    }

    res.status(200).json({ success: true, data: poaEntries });
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

    res.status(200).json({ success: true, message: "POA entry updated successfully." });
  } catch (error) {
    next(new Errorhandler("Failed to update POA entry.", 500));
  }
});
