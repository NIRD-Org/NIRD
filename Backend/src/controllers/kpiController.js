// Get all KPI

import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { KPIModel } from "../models/kpiModel.js";
import { Errorhandler } from "../utils/errorHandler.js";

export const createKPI = CatchAsyncError(async (req, res, next) => {
  try {
    const {
      id,
      theme_id,
      kpi_name,
      max_range,
      Input_Type,
      status,
      weightage,
      created_by,
      created_at,
      modified_by,
      modified_at,
      flag,
    } = req.body;

    const newKPI = new KPIModel({
      id,
      theme_id,
      kpi_name,
      max_range,
      Input_Type,
      status,
      weightage,
      created_by,
      created_at,
      modified_by,
      modified_at,
      flag,
    });

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
    const KPI = await KPIModel.find();
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
