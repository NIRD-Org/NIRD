// insert many
import { CatchAsyncError } from "../middlewares/catchAsyncError.js";

import { IndicatorModel } from "../models/indicatorModel.js";
import { Errorhandler } from "../utils/errorHandler.js";

export const getAllindicators = CatchAsyncError(async (req, res, next) => {
  try {
    const indicators = await IndicatorModel.find();
    res.status(200).json({
      success: true,
      indicators,
    });
  } catch (error) {
    return next(new Errorhandler("Couldn't fetch", 500));
  }
});

export const insertManyIndicator = CatchAsyncError(async (req, res, next) => {
  try {
    await IndicatorModel.insertMany(req.body);
    res.status(201).json({
      success: true,
      message: "Indicator Inserted Successfully",
    });
  } catch (error) {
    return next(new Errorhandler("Couldn't insert", 500));
  }
});
