import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import GoodPractice from "../models/goodPracticeModel.js";
import { UserLocationModel } from "../models/userLocationModel.js";
import { Errorhandler } from "../utils/errorHandler.js";
import { uploadFile, uploadPDF } from "../utils/uploadFile.js";

const getNewId = async () => {
  try {
    const maxDoc = await GoodPractice.aggregate([
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

export const createGoodPractice = CatchAsyncError(async (req, res, next) => {
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

    const newGoodPractice = new GoodPractice(req.body);
    await newGoodPractice.save();

    res.status(201).json({
      success: true,
      message: "Good Practice created successfully",
      data: newGoodPractice,
    });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Failed to create Good Practice", 500));
  }
});

export const getAllGoodPractices = CatchAsyncError(async (req, res, next) => {
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

    const goodPractices = await GoodPractice.aggregate([
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
      data: goodPractices,
    });
  } catch (error) {
    console.error(error);
    return next(new Errorhandler("Failed to get Good Practices", 500));
  }
});

export const getGoodPractices = CatchAsyncError(async (req, res, next) => {
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

    const goodPractices = await GoodPractice.aggregate([
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
          totalGoodPractices: { $sum: 1 },
          totalDocuments: {
            $sum: { $cond: [{ $ne: ["$document", ""] }, 1, 0] },
          },
          totalVideos: { $sum: { $cond: [{ $ne: ["$video", ""] }, 1, 0] } },
          goodPractices: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          _id: 0,
          totalGoodPractices: 1,
          totalDocuments: 1,
          totalVideos: 1,
          goodPractices: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Good Practices fetched successfully",
      data:
        goodPractices.length > 0
          ? goodPractices[0]
          : {
              totalGoodPractices: 0,
              totalDocuments: 0,
              totalVideos: 0,
              goodPractices: [],
            },
    });
  } catch (error) {
    console.error(error);
    return next(new Errorhandler("Failed to get Good Practices", 500));
  }
});

// Get similar good practices

export const getSimilarGoodPractices = CatchAsyncError(
  async (req, res, next) => {
    try {
      const goodPractices = await GoodPractice.aggregate([
        { $match: { id: { $ne: req.params.id } } },
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
          $sort: {
            _id: -1,
          },
        },
        {
          $limit: 8,
        },
      ]);

      res.status(200).json({
        success: true,
        message: "Good Practices fetched successfully",
        data: goodPractices,
      });
    } catch (error) {
      console.error(error);
      return next(new Errorhandler("Failed to get Good Practices", 500));
    }
  }
);

export const getGoodPracticeById = CatchAsyncError(async (req, res, next) => {
  try {
    const [goodPractice] = await GoodPractice.aggregate([
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

    if (!goodPractice) {
      return next(new Errorhandler("Good Practice not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Good Practice retrieved successfully",
      data: goodPractice,
    });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Failed to get Good Practice by ID", 500));
  }
});

export const updateGoodPractice = CatchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { goodPracticePhotos, goodPracticeDesign } = req.files || {};
    req.body.decision = 0;

    /*  if (goodPracticePhotos) {
      const goodPracticePhotosUrl = await uploadFile(goodPracticePhotos.data);
      req.body.goodPracticePhotos = goodPracticePhotosUrl;
    }

    if (goodPracticeDesign) {
      const goodPracticeDesignUrl = await uploadFile(goodPracticeDesign.data);
      req.body.goodPracticeDesign = goodPracticeDesignUrl;
    } */

    const updatedGoodPractice = await GoodPractice.findOneAndUpdate(
      { id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedGoodPractice) {
      return next(new Errorhandler("Good Practice not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Good Practice updated successfully",
      data: updatedGoodPractice,
    });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Failed to update Good Practice", 500));
  }
});

export const deleteGoodPractice = CatchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedGoodPractice = await GoodPractice.findByIdAndDelete(id);

    if (!deletedGoodPractice) {
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

export const approveGoodPractice = CatchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { decision, remarks } = req.body;
    console.log(req.body);

    const updatedGoodPractice = await GoodPractice.findOneAndUpdate(
      { id },
      { decision, remarks },
      { new: true }
    );

    if (!updatedGoodPractice) {
      return next(new Errorhandler("Good Practice not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Good Practice approved successfully",
      data: updatedGoodPractice,
    });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Failed to approve Good Practice", 500));
  }
});

export const getGoodPracticesData = CatchAsyncError(async (req, res, next) => {
  try {
  } catch (error) {
    return next(new Errorhandler("Failed to get GoodPractices ", 500));
  }
});
