import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { TalukModel } from "../models/talukModel.js";
import { Errorhandler } from "../utils/errorHandler.js";

// Controller to get all taluks
export const getAllTaluks = CatchAsyncError(async (req, res, next) => {
  try {
    const taluks = await TalukModel.find();
    if (taluks.length === 0) {
      return next(new Errorhandler("Taluks data not found", 400));
    }
    res.status(200).json(taluks);
  } catch (err) {
    return next(new Errorhandler("failed to get Taluks data", 500));
  }
});

// Controller to get a taluk by ID
export const getTalukById = CatchAsyncError(async (req, res, next) => {
  try {
    const taluk = await TalukModel.findOne({ id: req.params.id });
    if (!taluk) {
      return next(new Errorhandler("Taluks data not found", 400));
    }
    res.status(200).json(taluk);
  } catch (err) {
    return next(new Errorhandler("failed to get Taluks data", 500));
  }
});

// get taluk by states

export const getTaluksByState = CatchAsyncError(async (req, res, next) => {
  try {
    const taluks = await TalukModel.find({ state_id: req.params.state });
    if (taluks.length === 0) {
      return next(new Errorhandler("Taluks data not found", 400));
    }
    res.status(200).json(taluks);
  } catch (err) {
    return next(new Errorhandler("failed to get Taluks data", 500));
  }
});

// Get taluks by district

export const getTaluksByDistrict = CatchAsyncError(async (req, res, next) => {
  try {
    const taluks = await TalukModel.find({ dist_id: req.params.dist });
    if (taluks.length === 0) {
      return next(new Errorhandler("Taluks data not found", 400));
    }
    res.status(200).json(taluks);
  } catch (err) {
    return next(new Errorhandler("failed to get Taluks data", 500));
  }
});
