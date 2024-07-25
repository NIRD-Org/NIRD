// Get all KPI

import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { SoeprKpiModel } from "../models/soeprKpiModel.js";
import { Errorhandler } from "../utils/errorHandler.js";
const getNewId = async () => {
  try {
    const maxDoc = await SoeprKpiModel.aggregate([
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

    const newKPI = new SoeprKpiModel(req.body);
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
    const filter = {};
    filter.status = "1";
    const { theme_id, status } = req.query;
    if (theme_id) filter.theme_id = theme_id;
    if (status) filter.status = status;

    const KPI = await SoeprKpiModel.aggregate([
      { $match: filter },
      {
        $lookup: {
          from: "soeprthemes",
          localField: "theme_id",
          foreignField: "id",
          as: "theme",
        },
      },
      { $unwind: "$theme" },
      {
        $project: {
          _id: 0,
          id: 1,
          name: 1,
          theme_id: 1,
          theme_name: "$theme.theme_name",
          kpi_datapoint: 1,
          description: 1,
          input_type: 1,
          max_range: 1,
          kpi_type: 1,
          weightage: 1,
          status: 1,
        },
      },
    ]);
    if (!KPI) {
      return next(new Errorhandler("No KPI Found", 404));
    }
    res.status(200).json({
      success: true,
      message: "KPI Fetched Successfully",
      KPI,
    });
  } catch (error) {
    console.log(error);
    next(new Errorhandler("Failed to get KPI"));
  }
});

// Get KPI BY theme

export const getKPIByTheme = CatchAsyncError(async (req, res, next) => {
  try {
    const KPI = await SoeprKpiModel.aggregate([
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
    await SoeprKpiModel.findOneAndUpdate(
      { id: req.params.id },
      { status: "0" },
      { new: true }
    );
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
    const KPI = await SoeprKpiModel.findOneAndUpdate(
      { id: req.params.id },
      req.body
    );
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
    await SoeprKpiModel.insertMany(req.body);
    res.status(201).json({
      success: true,
      message: "KPI created successfully",
    });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Failed to create KPI", 500));
  }
});

export const getKpiById = CatchAsyncError(async (req, res, next) => {
  try {
    const KPI = await SoeprKpiModel.aggregate([
      { $match: { id: req.params.id } },
      {
        $lookup: {
          from: "soeprthemes",
          localField: "theme_id",
          foreignField: "id",
          as: "theme",
        },
      },
      { $unwind: "$theme" },
      {
        $project: {
          _id: 0,
          id: 1,
          name: 1,
          theme_id: 1,
          theme_name: "$theme.theme_name",
          kpi_datapoint: 1,
          description: 1,
          input_type: 1,
          max_range: 1,
          kpi_type: 1,
          weightage: 1,
          score_rules: 1,
        },
      },
    ]);

    if (!KPI || KPI.length === 0) {
      return next(new Errorhandler("KPI not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "KPI found successfully",
      kpi: KPI[0],
    });
  } catch (error) {
    console.error("Failed to get KPI by ID:", error);
    return next(new Errorhandler("Failed to get KPI by ID", 500));
  }
});
