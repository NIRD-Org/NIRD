import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { DistrictModel } from "../models/districtModel.js";
import { Errorhandler } from "../utils/errorHandler.js";

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
