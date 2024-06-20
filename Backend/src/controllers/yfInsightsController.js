import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { YfInsightsModel } from "../models/yfInsightsModel.js";
import { Errorhandler } from "../utils/errorHandler.js";
import { v2 as cloudinary } from "cloudinary";
import { uploadImage } from "../utils/uploadImage.js";

const getNewId = async () => {
  try {
    const maxDoc = await YfInsightsModel.aggregate([
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
    const achievementPhoto = req.files.achievementPhoto;
    const { url } = await uploadImage(achievementPhoto.data);
    req.body.achievementPhoto = url;
    const id = await getNewId();
    req.body.id = id.toString();

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
          _id: 1,
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
          dateOfSubmission: 1,
          achievementPhoto: 1,
        },
      },
    ]);

    if (!yfInsights) {
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
    const id = req.params.id;
    req.body.approved = true;

    const yfInsights = await YfInsightsModel.findOneAndUpdate(
      { id },
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

export const getYfInsightsById = CatchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const yfInsights = await YfInsightsModel.findOne({ id });
    if (!yfInsights) {
      return next(new Errorhandler("No yf insights found", 404));
    }

    res.status(200).json({
      success: true,
      message: "YF Insights retrieved successfully",
      data: yfInsights,
    });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Failed to get yf insights by id", 500));
  }
});
