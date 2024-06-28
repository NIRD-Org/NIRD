import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import Training from "../models/trainingModel.js";
import { Errorhandler } from "../utils/errorHandler.js";
import { uploadFile, uploadPDF } from "../utils/uploadFile.js";

const getNewId = async () => {
  try {
    const maxDoc = await Training.aggregate([
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

// Create a new training
export const createTraining = CatchAsyncError(async (req, res, next) => {
  try {
    const { trainingPhotos, trainingDesign } = req.files;
    console.log(req.body);

    const { url: trainingPhotosUrl } = await uploadFile(trainingPhotos.data);
    const { url: trainingDesignUrl } = await uploadPDF(trainingDesign.data);

    req.body.trainingPhotos = trainingPhotosUrl;
    req.body.trainingDesign = trainingDesignUrl;
    req.body.created_by = req.user.id;
    req.body.id = await getNewId();

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
    const { decision } = req.query;
    const filter = {};
    if (decision) filter.decision = decision;
    const trainings = await Training.find(filter);

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
    const training = await Training.findOne({ id });

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

    const updatedTraining = await Training.findOneAndUpdate({ id }, req.body, {
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

// Approve training by ID
export const approveTraining = CatchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { decision, remarks } = req.body;
    const approvedTraining = await Training.findOneAndUpdate(
      { id },
      { decision, remarks },
      { new: true }
    );

    if (!approvedTraining) {
      return next(new Errorhandler("Training not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Training approved successfully",
      data: approvedTraining,
    });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Failed to approve training", 500));
  }
});
