import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { GpModel } from "../models/gpModel.js";
import { Errorhandler } from "../utils/errorHandler.js";

export const createGP = CatchAsyncError(async (req, res, next) => {
  try {
    const {
      id,
      state_id,
      district_id,
      taluk_id,
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

    const newGP = new GP({
      id,
      state_id,
      district_id,
      taluk_id,
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

    await newGP.save();

    res.status(201).json({
      success: true,
      message: "GP created successfully",
      gp: newGP,
    });
  } catch (error) {
    return next(new Errorhandler("Failed to create GP", 500));
  }
});

export const getGpByDistrict = CatchAsyncError(async (req, res, next) => {
  try {
    const gram = await GpModel.find({ dist_id: req.params.dist });
    if (!gram || gram.length === 0) {
      return next(new Errorhandler("No Gram Panchayat Found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Gram Panchayat Fetched Successfully",
      gram,
    });
  } catch (error) {
    return next(new Errorhandler("Failed to get Gram Panchayat", 500));
  }
});

export const getGpByTaluk = CatchAsyncError(async (req, res, next) => {
  try {
    const gram = await GpModel.find({ taluk_id: req.params.taluk });
    if (!gram || gram.length === 0) {
      return next(new Errorhandler("No Gram Panchayat Found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Gram Panchayat Fetched Successfully",
      gram,
    });
  } catch (error) {
    return next(new Errorhandler("Failed to get Gram Panchayat", 500));
  }
});
