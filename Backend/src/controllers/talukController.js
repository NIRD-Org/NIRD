import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { TalukModel } from "../models/talukModel.js";
import { Errorhandler } from "../utils/errorHandler.js";

export const createTaluk = CatchAsyncError(async (req, res, next) => {
  try {
    const {
      id,
      state_id,
      dist_id,
      lgd_code,
      lgd_code_feb11_2021,
      name,
      is_maped_to_another_district,
      status,
      created_by,
      created_at,
      modified_by,
      modified_at,
    } = req.body;

    const newTaluk = new TalukModel({
      id,
      state_id,
      dist_id,
      lgd_code,
      lgd_code_feb11_2021,
      name,
      is_maped_to_another_district,
      status,
      created_by,
      created_at,
      modified_by,
      modified_at,
    });

    await newTaluk.save();

    res.status(201).json({
      success: true,
      message: "Taluk created successfully",
      taluk: newTaluk,
    });
  } catch (error) {
    return next(new Errorhandler("Failed to create taluk", 500));
  }
});

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
