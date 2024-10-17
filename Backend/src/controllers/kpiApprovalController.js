import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { KPIApprovalModel } from "../models/kpiApprovalModel.js";
import { UserLocationModel } from "../models/userLocationModel.js";
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
    const {
      state,
      dist,
      block,
      gp,
      theme,
      decision,
      fy,
      state_id,
      dist_id,
      block_id,
      gp_id,
      theme_id,
    } = req.query;
    const match = {};

    if (state) match.state_id = state;
    if (dist) match.dist_id = dist;
    if (block) match.block_id = block;
    if (gp) match.gp_id = gp;
    if (state_id) match.state_id = state_id;
    if (dist_id) match.dist_id = dist_id;
    if (block_id) match.block_id = block_id;
    if (gp_id) match.gp_id = gp_id;
    if (theme_id) match.theme_id = theme_id;
    if (theme) match.theme_id = theme;
    if (decision) match.decision = decision;
    if (req.user.role == 3) match.created_by = req.user.id;
    // Financial year
    if (fy) match.financial_year = fy;
    if (req.user.role == 2 && !req.query.state_id) {
      const { userLocations } = await UserLocationModel.findOne({
        user_id: req.user.id,
      });
      const stateIds = userLocations.state_ids;
      match.state_id = { $in: stateIds };
    }
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
        $lookup: {
          from: "grampanchayats",
          localField: "gp_id",
          foreignField: "id",
          as: "gramDetails",
        },
      },
      {
        $lookup: {
          from: "states",
          localField: "state_id",
          foreignField: "id",
          as: "stateDetails",
        },
      },
      {
        $unwind: "$themeDetails",
      },
      {
        $unwind: "$gramDetails",
      },
      {
        $unwind: "$stateDetails",
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
          financial_year: 1,
          quarter: 1,
          month: 1,
          frequency: 1,
          theme_name: "$themeDetails.theme_name",
          gp_name: "$gramDetails.name",
          state_name: "$stateDetails.name",
          decision: 1,
          submitted_id: 1,
          remarks: 1,
          status: 1,
          created_by: 1,
          created_at: 1,
          modified_at: 1,
          date: 1,
        },
      },
      { $sort: { created_at: -1 } },
    ]);

    if (!categorizedKPIApprovals) {
      return next(new Errorhandler("No KPI Approvals Found", 404));
    }

    res.status(200).json({
      success: true,
      message: "KPI Approvals Fetched Successfully",
      data: categorizedKPIApprovals,
    });
  } catch (error) {
    console.log(error);

    return next(new Errorhandler("Failed to get SOEPR KPI", 500));
  }
});

// Update the approval status and decision status

export const updateKPIApproval = CatchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { decision, remarks } = req.body;
    const kpiApproval = await KPIApprovalModel.findOneAndUpdate(
      { submitted_id: id },
      { decision, remarks },
      { new: true }
    );
    if (!kpiApproval) {
      return next(new Errorhandler("KPI Approval not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "KPI Approval Updated Successfully",
    });
  } catch (error) {
    return next(new Errorhandler("Failed to update KPI Approval", 500));
  }
});

// get the gpdata
