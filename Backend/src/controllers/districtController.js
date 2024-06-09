import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { DistrictModel } from "../models/districtModel.js";
import { Errorhandler } from "../utils/errorHandler.js";

const getNewId = async () => {
  try {
    const maxDoc = await DistrictModel.findOne().sort("-id").exec();
    const maxId = maxDoc ? maxDoc.id : 0;
    return maxId + 1;
  } catch (error) {
    return next(new Errorhandler("failed to get new id", 500));
  }
};

export const createDistrict = CatchAsyncError(async (req, res, next) => {
  try {
    const id = await getNewId();
    req.body.id = id.toString();
    const newDistrict = new DistrictModel(req.body);
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
