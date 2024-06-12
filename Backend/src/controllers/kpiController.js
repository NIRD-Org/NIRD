// Get all KPI

import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { KPIModel } from "../models/kpiModel.js";
import { Errorhandler } from "../utils/errorHandler.js";
const getNewId = async () => {
  try {
    const maxDoc = await KPIModel.aggregate([
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
export const createKPI = CatchAsyncError(async (req, res, next) => {
  try {
    const id = await getNewId();
    req.body.id = id.toString();
    const newKPI = new KPIModel(req.body);
    await newKPI.save();
    res.status(201).json({
      success: true,
      message: "KPI created successfully",
      kpi: newKPI,
    });
  } catch (error) {
    return next(new Errorhandler("Failed to create KPI", 500));
  }
});

export const getAllKPI = CatchAsyncError(async (req, res, next) => {
  try {
    const KPI = await KPIModel.find({
      theme_id: "10",
    });
    if (!KPI || KPI.length === 0) {
      return next(new Errorhandler("No KPI Found", 404));
    }
    res.status(200).json({
      success: true,
      message: "KPI Fetched Successfully",
      KPI,
    });
  } catch (error) {
    next(new Errorhandler("Failed to get KPI"));
  }
});

// Get KPI BY theme

export const getKPIByTheme = CatchAsyncError(async (req, res, next) => {
  try {
    const KPI = await KPIModel.find({ theme_id: req.params.theme });
    if (!KPI || KPI.length === 0) {
      return next(new Errorhandler("No KPI Found", 404));
    }
    res.status(200).json({
      success: true,
      message: "KPI Fetched Successfully",
      KPI,
    });
  } catch (error) {
    next();
  }
});
