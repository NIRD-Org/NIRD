import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { IndicatorApprovalModel } from "../models/indicatorApprovalModel.js";
import { UserLocationModel } from "../models/userLocationModel.js";
import { Errorhandler } from "../utils/errorHandler.js";

export const getIndicatorApprovals = CatchAsyncError(async (req, res, next) => {
  try {
    const { state, dist, block, gp, decision, fy } = req.query;
    const match = {};

    if (state) match.state_id = state;
    if (dist) match.dist_id = dist;
    if (block) match.block_id = block;
    if (gp) match.gp_id = gp;
    if (decision) match.decision = decision;
    if (req?.user?.role == 3) match.created_by = req.user.id;
    // Financial year
    if (fy) match.financial_year = fy;
    if (req.user.role == 2  && !req.query.state) {
      const {userLocations} = await UserLocationModel.findOne({ user_id: req.user.id });
      const stateIds = userLocations.state_ids
      match.state_id = { $in: stateIds };
    }
    const categorizedIndicatorApprovals =
      await IndicatorApprovalModel.aggregate([
        { $match: match },
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
          $unwind: "$gramDetails",
        },
        {
          $unwind: "$stateDetails",
        },
        {
          $project: {
            _id: 0,
            id: 1,
            state_id: 1,
            dist_id: 1,
            block_id: 1,
            gp_id: 1,
            financial_year: 1,
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

    if (!categorizedIndicatorApprovals) {
      return next(new Errorhandler("No Indicator Approvals Found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Indicator Approvals Fetched Successfully",
      data: categorizedIndicatorApprovals,
    });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Failed to get Indicator approvals", 500));
  }
});

// Update the approval status and decision status

export const updateIndicatorApproval = CatchAsyncError(
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { decision, remarks } = req.body;
      const indicatorApproval = await IndicatorApprovalModel.findOneAndUpdate(
        { submitted_id: id },
        { decision, remarks },
        { new: true }
      );
      if (!indicatorApproval) {
        return next(new Errorhandler("KPI Approval not found", 404));
      }
      res.status(200).json({
        success: true,
        message: "Indicator Approval Updated Successfully",
      });
    } catch (error) {
      return next(new Errorhandler("Failed to update Indicator Approval", 500));
    }
  }
);
