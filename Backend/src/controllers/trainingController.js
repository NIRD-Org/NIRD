import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import Training from "../models/trainingModel.js";
import { Errorhandler } from "../utils/errorHandler.js";
import { uploadFile } from "../utils/uploadFile.js";

// Create a new training
export const createTraining = CatchAsyncError(async (req, res, next) => {
  try {
    const { trainingPhotos, trainingDesign } = req.files;
    console.log(req.body);

    const { url: trainingPhotosUrl } = await uploadFile(trainingPhotos.data);
    const { url: trainingDesignUrl } = await uploadFile(
      trainingDesign.data,
      null,
      "pdf"
    );

    req.body.trainingPhotos = trainingPhotosUrl;
    req.body.trainingDesign = trainingDesignUrl;

    const newTraining = new Training(req.body);
    await newTraining.save();

    res.status(201).json({
      success: true,
      message: "Training created successfully",
      data: newTraining,
    });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Failed to create training", 500));
  }
});

// Get all trainings
export const getAllTrainings = CatchAsyncError(async (req, res, next) => {
  try {
    const trainings = await Training.find();

    if (!trainings) {
      return next(new Errorhandler("No trainings found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Trainings fetched successfully",
      data: trainings,
    });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Failed to get trainings", 500));
  }
});

// Get training by ID
export const getTrainingById = CatchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const training = await Training.findById(id);

    if (!training) {
      return next(new Errorhandler("Training not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Training retrieved successfully",
      data: training,
    });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Failed to get training by ID", 500));
  }
});

// Update training by ID
export const updateTraining = CatchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { trainingPhotos, trainingDesign } = req.files || {};

    if (trainingPhotos) {
      const trainingPhotosUrl = await uploadFile(trainingPhotos.data);
      req.body.trainingPhotos = trainingPhotosUrl;
    }

    if (trainingDesign) {
      const trainingDesignUrl = await uploadFile(trainingDesign.data);
      req.body.trainingDesign = trainingDesignUrl;
    }

    const updatedTraining = await Training.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTraining) {
      return next(new Errorhandler("Training not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Training updated successfully",
      data: updatedTraining,
    });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Failed to update training", 500));
  }
});

// Delete training by ID
export const deleteTraining = CatchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedTraining = await Training.findByIdAndDelete(id);

    if (!deletedTraining) {
      return next(new Errorhandler("Training not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Training deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Failed to delete training", 500));
  }
});
