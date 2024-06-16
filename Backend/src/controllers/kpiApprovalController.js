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
    if (dist) match.dist_id = dist;
    if (block) match.block_id = block;
    if (gp) match.gp_id = gp;
    if (theme) match.theme_id = theme;

    const categorizedKPIApprovals = await KPIApprovalModel.aggregate([
      { $match: match },
      {
        $lookup: {
          from: "themes",
          localField: "theme_id",
          foreignField: "id",
          as: "themeDetails",
        },
      },
      {
        $unwind: "$themeDetails",
      },
      {
        $project: {
          _id: 1,
          id: 1,
          state_id: 1,
          dist_id: 1,
          block_id: 1,
          gp_id: 1,
          theme_id: 1,
          theme_name: "$themeDetails.theme_name",
          decision: 1,
          submitted_id: 1,
          remarks: 1,
          status: 1,
          created_by: 1,
          created_at: 1,
          modified_at: 1,
        },
      },
      { $sort: { created_at: -1 } },
    ]);

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

// Update the approval status and decision status

export const updateKPIApproval = CatchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { decision, remarks } = req.body;
    const kpiApproval = await KPIApprovalModel.findOneAndUpdate(
      { id },
      { decision, remarks },
      { new: true }
    );
    if (!kpiApproval) {
      return next(new Errorhandler("KPI Approval not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "KPI Approval Updated Successfully",
      kpiApproval,
    });
  } catch (error) {
    return next(new Errorhandler("Failed to update KPI Approval", 500));
  }
});
