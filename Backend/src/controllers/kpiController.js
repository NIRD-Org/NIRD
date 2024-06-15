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
    req.body.created_by = req.user.id;

    const newKPI = new KPIModel(req.body);
    await newKPI.save();
    res.status(201).json({
      success: true,
      message: "KPI created successfully",
      kpi: newKPI,
    });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Failed to create KPI", 500));
  }
});

export const getAllKPI = CatchAsyncError(async (req, res, next) => {
  try {
    const KPI = await KPIModel.find({});
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
    const KPI = await KPIModel.aggregate([
      { $match: { theme_id: req.params.theme } },
      { $addFields: { numeric_id: { $toInt: "$id" } } },
      { $sort: { numeric_id: 1 } },
      { $project: { numeric_id: 0 } },
    ]);

    if (!KPI || KPI.length === 0) {
      return next(new Errorhandler("No KPI Found", 404));
    }

    res.status(200).json({
      success: true,
      message: "KPI Fetched Successfully",
      KPI,
    });
  } catch (error) {
    return next(new Errorhandler("Failed to fetch KPI", 500));
  }
});

// Delete teh kpi - set status to "0"

export const deleteKPI = CatchAsyncError(async (req, res, next) => {
  try {
    const KPI = await KPIModel.findOneAndUpdate({ _id: req.params.id }, { status: "0" });
    if (!KPI) {
      return next(new Errorhandler("No KPI Found", 404));
    }
    res.status(200).json({
      success: true,
      message: "KPI Deleted Successfully",
    });
  } catch (error) {
    return next(new Errorhandler("Failed to delete KPI", 500));
  }
});

// Update the kpi

export const updateKPI = CatchAsyncError(async (req, res, next) => {
  try {
    const KPI = await KPIModel.findOneAndUpdate({ _id: req.params.id }, req.body);
    if (!KPI) {
      return next(new Errorhandler("No KPI Found", 404));
    }
    res.status(200).json({
      success: true,
      message: "KPI Updated Successfully",
    });
  } catch (error) {
    return next(new Errorhandler("Failed to update KPI", 500));
  }
});

// insert many

export const insertManyKPI = CatchAsyncError(async (req, res, next) => {
  try {
    await KPIModel.insertMany(req.body);
    res.status(201).json({
      success: true,
      message: "KPI created successfully",
    });
  } catch (error) {
    return next(new Errorhandler("Failed to create KPI", 500));
  }
});
