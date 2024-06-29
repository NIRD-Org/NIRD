import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import LCVA from "../models/LCVAModel.js";
import { UserLocationModel } from "../models/userLocationModel.js";
import { Errorhandler } from "../utils/errorHandler.js";
import { uploadFile, uploadPDF } from "../utils/uploadFile.js";

const getNewId = async () => {
  try {
    const maxDoc = await LCVA.aggregate([
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

export const createLCVA = CatchAsyncError(async (req, res, next) => {
  try {
    const { image, document, video } = req.files;
    console.log(req.body);

    const [imageUrl, docUrl, videoUrl] = await Promise.all([
      uploadFile(image.data),
      uploadPDF(document.data),
      uploadFile(video.data, null),
    ]).then(([image, document, video]) => [image.url, document.url, video.url]);

    req.body.image = imageUrl;
    req.body.document = docUrl;
    req.body.video = videoUrl;
    req.body.id = await getNewId();
    req.body.created_by = req?.user?.id;

    const newLCVA = new LCVA(req.body);
    await newLCVA.save();

    res.status(201).json({
      success: true,
      message: "Good Practice created successfully",
      data: newLCVA,
    });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Failed to create Good Practice", 500));
  }
});

export const getAllLCVAs = CatchAsyncError(async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.state_id) filter.state_id = req.query.state_id;
    if (req.query.dist_id) filter.dist_id = req.query.dist_id;
    if (req.query.block_id) filter.block_id = req.query.block_id;
    if (req.query.gp_id) filter.gp_id = req.query.gp_id;
    if (req.query.theme_id) filter.theme_id = req.query.theme_id;
    if (req.query.decision) filter.decision = parseInt(req.query.decision);
    if (req.user.role == 3) filter.created_by = req.user.id;
    if (req.user.role == 2 && !req.query.state_id) {
      const { userLocations } = await UserLocationModel.findOne({
        user_id: req.user.id,
      });
      const stateIds = userLocations.state_ids;
      filter.state_id = { $in: stateIds };
    }

    const lCVAs = await LCVA.aggregate([
      { $match: filter },
      {
        $lookup: {
          from: "themes",
          localField: "theme_id",
          foreignField: "id",
          as: "theme",
        },
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
          localField: "dist_id",
          foreignField: "id",
          as: "district",
        },
      },
      {
        $lookup: {
          from: "blocks",
          localField: "block_id",
          foreignField: "id",
          as: "block",
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
      { $unwind: "$theme" },
      { $unwind: "$state" },
      { $unwind: "$block" },
      { $unwind: "$district" },
      { $unwind: "$gp" },
      {
        $addFields: {
          theme_name: "$theme.theme_name",
          state_name: "$state.name",
          block_name: "$block.name",
          dist_name: "$district.name",
          gp_name: "$gp.name",
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Good Practices fetched successfully",
      data: lCVAs,
    });
  } catch (error) {
    console.error(error);
    return next(new Errorhandler("Failed to get Good Practices", 500));
  }
});

export const getLCVAs = CatchAsyncError(async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.state_id) filter.state_id = req.query.state_id;
    if (req.query.dist_id) filter.dist_id = req.query.dist_id;
    if (req.query.block_id) filter.block_id = req.query.block_id;
    if (req.query.gp_id) filter.gp_id = req.query.gp_id;
    if (req.query.theme_id) filter.theme_id = req.query.theme_id;
    if (req.query.decision) filter.decision = 1;
    if (req.query.fy) filter.financial_year = req.query.fy;
    const keyword = req.query.keyword ? req.query.keyword : "";

    const lCVAs = await LCVA.aggregate([
      { $match: filter },
      {
        $lookup: {
          from: "themes",
          localField: "theme_id",
          foreignField: "id",
          as: "theme",
        },
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
          localField: "dist_id",
          foreignField: "id",
          as: "district",
        },
      },
      {
        $lookup: {
          from: "blocks",
          localField: "block_id",
          foreignField: "id",
          as: "block",
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
      { $unwind: "$theme" },
      { $unwind: "$state" },
      { $unwind: "$block" },
      { $unwind: "$district" },
      { $unwind: "$gp" },
      {
        $addFields: {
          theme_name: "$theme.theme_name",
          state_name: "$state.name",
          block_name: "$block.name",
          dist_name: "$district.name",
          gp_name: "$gp.name",
        },
      },
      {
        $match: {
          $or: [
            { theme_name: { $regex: keyword, $options: "i" } },
            { state_name: { $regex: keyword, $options: "i" } },
            { block_name: { $regex: keyword, $options: "i" } },
            { dist_name: { $regex: keyword, $options: "i" } },
            { gp_name: { $regex: keyword, $options: "i" } },
            { activityTitle: { $regex: keyword, $options: "i" } },
          ],
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
      {
        $group: {
          _id: null,
          totalLCVAs: { $sum: 1 },
          totalDocuments: {
            $sum: { $cond: [{ $ne: ["$document", ""] }, 1, 0] },
          },
          totalVideos: { $sum: { $cond: [{ $ne: ["$video", ""] }, 1, 0] } },
          lCVAs: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          _id: 0,
          totalLCVAs: 1,
          totalDocuments: 1,
          totalVideos: 1,
          lCVAs: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Good Practices fetched successfully",
      data:
        lCVAs.length > 0
          ? lCVAs[0]
          : {
              totalLCVAs: 0,
              totalDocuments: 0,
              totalVideos: 0,
              lCVAs: [],
            },
    });
  } catch (error) {
    console.error(error);
    return next(new Errorhandler("Failed to get Good Practices", 500));
  }
});

export const getLCVAById = CatchAsyncError(async (req, res, next) => {
  try {
    const [lCVA] = await LCVA.aggregate([
      { $match: { id: req.params.id } },
      {
        $lookup: {
          from: "themes",
          localField: "theme_id",
          foreignField: "id",
          as: "theme",
        },
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
          localField: "dist_id",
          foreignField: "id",
          as: "district",
        },
      },
      {
        $lookup: {
          from: "blocks",
          localField: "block_id",
          foreignField: "id",
          as: "block",
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
      { $unwind: "$theme" },
      { $unwind: "$state" },
      { $unwind: "$district" },
      { $unwind: "$block" },
      { $unwind: "$gp" },
      {
        $addFields: {
          theme_name: "$theme.theme_name",
          state_name: "$state.name",
          dist_name: "$district.name",
          block_name: "$block.name",
          gp_name: "$gp.name",
        },
      },
    ]);

    if (!lCVA) {
      return next(new Errorhandler("Good Practice not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Good Practice retrieved successfully",
      data: lCVA,
    });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Failed to get Good Practice by ID", 500));
  }
});

export const updateLCVA = CatchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { lCVAPhotos, lCVADesign } = req.files || {};
    req.body.decision = 0;

    /*  if (lCVAPhotos) {
      const lCVAPhotosUrl = await uploadFile(lCVAPhotos.data);
      req.body.lCVAPhotos = lCVAPhotosUrl;
    }

    if (lCVADesign) {
      const lCVADesignUrl = await uploadFile(lCVADesign.data);
      req.body.lCVADesign = lCVADesignUrl;
    } */

    const updatedLCVA = await LCVA.findOneAndUpdate(
      { id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedLCVA) {
      return next(new Errorhandler("Good Practice not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Good Practice updated successfully",
      data: updatedLCVA,
    });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Failed to update Good Practice", 500));
  }
});

export const deleteLCVA = CatchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedLCVA = await LCVA.findByIdAndDelete(id);

    if (!deletedLCVA) {
      return next(new Errorhandler("Good Practice not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Good Practice deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Failed to delete Good Practice", 500));
  }
});

export const approveLCVA = CatchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { decision, remarks } = req.body;
    console.log(req.body);

    const updatedLCVA = await LCVA.findOneAndUpdate(
      { id },
      { decision, remarks },
      { new: true }
    );

    if (!updatedLCVA) {
      return next(new Errorhandler("Good Practice not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Good Practice approved successfully",
      data: updatedLCVA,
    });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Failed to approve Good Practice", 500));
  }
});

export const getLCVAsData = CatchAsyncError(async (req, res, next) => {
  try {
  } catch (error) {
    return next(new Errorhandler("Failed to get LCVAs ", 500));
  }
});
