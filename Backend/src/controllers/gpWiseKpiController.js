import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { GpWiseKpiModel } from "../models/gpWiseKpiModel.js";
import { Errorhandler } from "../utils/errorHandler.js";

export const getGpWiseKpi = CatchAsyncError(async (req, res, next) => {
  try {
    const limit = req.query.limit || 50;
    const pageNumber = req.query.page || 1;
    const startIndex = (pageNumber - 1) * limit;
    const gpWiseKpiData = await GpWiseKpiModel.aggregate([
      {
        $group: {
          _id: "$gp_id",
          doc: { $first: "$$ROOT" },
        },
      },
      {
        $replaceRoot: { newRoot: "$doc" },
      },
      {
        $lookup: {
          from: "states",
          localField: "state_id",
          foreignField: "id",
          as: "state",
        },
      },
      {
        $lookup: {
          from: "districts",
          localField: "district_id",
          foreignField: "id",
          as: "district",
        },
      },
      {
        $lookup: {
          from: "taluks",
          localField: "taluk_id",
          foreignField: "id",
          as: "taluk",
        },
      },
      {
        $lookup: {
          from: "grampanchayats",
          localField: "gp_id",
          foreignField: "id",
          as: "gp",
        },
      },
      {
        $project: {
          id: 1,
          state: { $arrayElemAt: ["$state", 0] },
          district: { $arrayElemAt: ["$district", 0] },
          taluk: { $arrayElemAt: ["$taluk", 0] },
          gp: { $arrayElemAt: ["$gp", 0] },
          date: 1,
          theme_id: 1,
          kpi_id: 1,
          question_id: 1,
          max_range: 1,
          input_data: 1,
          score: 1,
          remarks: 1,
          status: 1,
          submitteed_id: 1,
          created_by: 1,
          created_at: 1,
          modified_by: 1,
          modified_at: 1,
        },
      },
      { $skip: startIndex },
      { $limit: limit },
      { $sort: { created_at: -1 } },
    ]);
    if (!gpWiseKpiData || gpWiseKpiData.length === 0) {
      return next(new Errorhandler("No Gp Wise KPI Data Found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Gp Wise KPI Data Fetched Successfully",
      data: gpWiseKpiData,
    });
  } catch (error) {
    return next(new Errorhandler(error.message, 500));
  }
});
