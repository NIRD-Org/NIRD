import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { KPIApprovalModel } from "../models/kpiApprovalModel.js";
import { Errorhandler } from "../utils/errorHandler.js";
const getNewId = async () => {
  try {
    const maxDoc = await KPIApprovalModel.aggregate([
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

export const getAllKPIApprovals = CatchAsyncError(async (req, res, next) => {
  try {
    const KPIApprovals = await KPIApprovalModel.find();
    if (!KPIApprovals || KPIApprovals.length === 0) {
      return next(new Errorhandler("No KPI Approvals Found", 404));
    }
    res.status(200).json({
      success: true,
      message: "KPI Approvals Fetched Successfully",
      KPIApprovals,
    });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Failed to get KPI approvals", 500));
  }
});

// Get kpi approvals by any of state, district, block and gp for a theme

export const getKPIApprovals = CatchAsyncError(async (req, res, next) => {
  try {
    const { state, dist, block, gp, theme } = req.query;
    const match = {};

    if (state) match.state_id = state;
    if (dist) match.district_id = dist;
    if (block) match.block_id = block;
    if (gp) match.gp_id = gp;

    const pipeline = [
      { $match: match },
      {
        $group: {
          _id: "$theme_id",
          approvals: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          theme_id: "$_id",
          approvals: 1,
          _id: 0,
        },
      },
    ];

    const categorizedKPIApprovals = await KPIApprovalModel.aggregate(pipeline);

    if (!categorizedKPIApprovals || categorizedKPIApprovals.length === 0) {
      return next(new Errorhandler("No KPI Approvals Found", 404));
    }

    res.status(200).json({
      success: true,
      message: "KPI Approvals Fetched Successfully",
      data: categorizedKPIApprovals,
    });
  } catch (error) {
    return next(new Errorhandler("Failed to get KPI approvals", 500));
  }
});
