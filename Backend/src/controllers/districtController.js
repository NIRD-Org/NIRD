import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { DistrictModel } from "../models/districtModel.js";
import { Errorhandler } from "../utils/errorHandler.js";

export const createDistrict = CatchAsyncError(async (req, res, next) => {
  try {
    const {
      id,
      lgd_code,
      state_id,
      name,
      special_area,
      special_area_id,
      aspirational_district,
      status,
      created_by,
      created_at,
      modified_by,
      modified_at,
    } = req.body;

    const newDistrict = new DistrictModel({
      id,
      lgd_code,
      state_id,
      name,
      special_area,
      special_area_id,
      aspirational_district,
      status,
      created_by,
      created_at,
      modified_by,
      modified_at,
    });

    await newDistrict.save();

    res.status(201).json({
      success: true,
      message: "District created successfully",
      district: newDistrict,
    });
  } catch (error) {
    return next(new Errorhandler("Failed to create district", 500));
  }
});

export const getDistrictByState = CatchAsyncError(async (req, res, next) => {
  try {
    const districtData = await DistrictModel.find({
      state_id: req.params.state,
    });
    if (!districtData || districtData.length === 0) {
      return next(new Errorhandler("No District Data Found", 404));
    }
    res.status(200).json({
      success: true,
      message: "District Data Fetched Successfully",
      districts: districtData,
    });
  } catch (error) {
    return next(new Errorhandler("Failed to fetch District", 500));
  }
});
