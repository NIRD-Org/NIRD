import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { YfInsightsModel } from "../models/yfInsightsModel.js";
import { Errorhandler } from "../utils/errorHandler.js";
import { v2 as cloudinary } from "cloudinary";
export const createYfInsights = CatchAsyncError(async (req, res, next) => {
  try {
    const { gp_id, financialYear } = req.body;
    const existingInsight = await YfInsightsModel.findOne({
      gp_id,
      financialYear,
    });

    if (existingInsight) {
      return next(
        new Errorhandler(
          "A YF Insight for this Gram Panchayat and financial year already exists",
          400
        )
      );
    }
    if (req.body.achievement) {
      const result = await cloudinary.uploader.upload(req.body.achievement, {
        folder: "achievements",
        resource_type: "auto",
      });

      req.body.achievement = result.secure_url;
    }

    const yfInsights = new YfInsightsModel(req.body);
    await yfInsights.save();
    res.status(201).json({
      success: true,
      message: "YF Insights created successfully",
    });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Failed to create yf insights", 500));
  }
});

// Get all yf insights

export const getAllYfInsights = CatchAsyncError(async (req, res, next) => {
  try {
    const { state, dist, gp, block } = req.query;
    const match = {};
    if (state) match.state_id = state;
    if (dist) match.dist_id = dist;
    if (block) match.block_id = block;
    if (gp) match.gp_id = gp;

    const yfInsights = await YfInsightsModel.aggregate([
      { $match: match },
      {
        $lookup: {
          from: "states",
          localField: "state_id",
          foreignField: "id",
          as: "state",
        },
      },
      { $unwind: "$state" },
      {
        $lookup: {
          from: "districts",
          localField: "dist_id",
          foreignField: "id",
          as: "district",
        },
      },
      { $unwind: "$district" },
      {
        $lookup: {
          from: "blocks",
          localField: "block_id",
          foreignField: "id",
          as: "block",
        },
      },
      { $unwind: "$block" },
      {
        $lookup: {
          from: "grampanchayats",
          localField: "gp_id",
          foreignField: "id",
          as: "gp",
        },
      },
      { $unwind: "$gp" },
      { $sort: { created_at: -1 } },
      {
        $project: {
          _id: 0,
          id: 1,
          state_id: 1,
          dist_id: 1,
          block_id: 1,
          gp_id: 1,
          name: 1,
          dateOfJoining: 1,
          financialYear: 1,
          failures: 1,
          achievement: 1,
          state_name: "$state.name",
          dist_name: "$district.name",
          block_name: "$block.name",
          gp_name: "$gp.name",
          created_at: 1,
          updated_at: 1,
        },
      },
    ]);

    if (!yfInsights || yfInsights.length === 0) {
      return next(new Errorhandler("No yf insights found", 404));
    }

    res.status(200).json({
      success: true,
      message: "YF Insights fetched successfully",
      data: yfInsights,
    });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Failed to get yf insights", 500));
  }
});

// Update yf insights

export const updateYfInsights = CatchAsyncError(async (req, res, next) => {
  try {
    const { state, dist, block, gp } = req.query;
    if (req.body.achievement) {
      const result = await cloudinary.uploader.upload(req.body.achievement, {
        folder: "achievements",
        resource_type: "auto",
      });
      req.body.achievement = result.secure_url;
    }
    const yfInsights = await YfInsightsModel.findOneAndUpdate(
      { gp_id: gp },
      req.body,
      { new: true }
    );

    if (!yfInsights) {
      return next(new Errorhandler("No yf insights found", 404));
    }

    res.status(200).json({
      success: true,
      message: "YF Insights updated successfully",
      data: yfInsights,
    });
  } catch {
    console.log(error);
    return next(new Errorhandler("Failed to update yf insights", 500));
  }
});
