import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import GoodPractice from "../models/goodPracticeModel.js";
import { Errorhandler } from "../utils/errorHandler.js";
import { uploadFile } from "../utils/uploadFile.js";

export const createGoodPractice = CatchAsyncError(async (req, res, next) => {
  try {
    const { image, document, video } = req.files;
    console.log(req.body);

    const { url: imageUrl } = await uploadFile(image.data);
    const { url: docUrl } = await uploadFile(document.data, null);
    const { url: videoUrl } = await uploadFile(video.data, null);

    req.body.image = imageUrl;
    req.body.document = docUrl;
    req.body.video = videoUrl;

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

// Get all good practices
export const getAllGoodPractices = CatchAsyncError(async (req, res, next) => {
  try {
    const goodPractices = await GoodPractice.find();

    if (!goodPractices || goodPractices.length === 0) {
      return next(new Errorhandler("No Good Practices found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Good Practices fetched successfully",
      data: goodPractices,
    });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Failed to get Good Practices", 500));
  }
});

// Get good practice by ID
export const getGoodPracticeById = CatchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const goodPractice = await GoodPractice.findById(id);

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

// Update good practice by ID
export const updateGoodPractice = CatchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { goodPracticePhotos, goodPracticeDesign } = req.files || {};

    if (goodPracticePhotos) {
      const goodPracticePhotosUrl = await uploadFile(goodPracticePhotos.data);
      req.body.goodPracticePhotos = goodPracticePhotosUrl;
    }

    if (goodPracticeDesign) {
      const goodPracticeDesignUrl = await uploadFile(goodPracticeDesign.data);
      req.body.goodPracticeDesign = goodPracticeDesignUrl;
    }

    const updatedGoodPractice = await GoodPractice.findByIdAndUpdate(
      id,
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

// Delete good practice by ID
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
