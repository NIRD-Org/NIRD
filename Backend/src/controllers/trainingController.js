import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import Training from "../models/trainingModel.js";
import { UserLocationModel } from "../models/userLocationModel.js";
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

    const trainingPhotosUrl = await uploadFile(trainingPhotos.data);
    const trainingDesignUrl = await uploadPDF(trainingDesign.data);

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
    const { decision, state_id, dist_id, block_id, gp_id } = req.query;
    const filter = {};

    if (decision) filter.decision = decision;
    if (state_id) filter.state_id = state_id;
    if (block_id) filter.block_id = block_id;
    if (gp_id) filter.gp_id = gp_id;
    if (dist_id) filter.dist_id = dist_id;
    if (req.user.role == 3) filter.created_by = req.user.id;
    /* if (req.user.role == 2) {
      const {userLocations} = await UserLocationModel.findOne({ user_id: req.user.id });
      const stateIds = userLocations.state_ids
      filter.state_id = { $in: stateIds };
    } */
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

// Get training data for homepage
export const getTrainingData = CatchAsyncError(async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const trainingData = await Training.find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();
    const totalItems = await Training.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        trainingData,
        pagination: {
          totalItems,
          totalPages: Math.ceil(totalItems / limit),
          currentPage: page,
        },
      },
    });
  } catch (error) {
    return next(new Errorhandler("Failed to get training data", 500));
  }
});

// Get all training images
export const getAllTrainingImages = CatchAsyncError(async (req, res, next) => {
  try {
    const result = await Training.aggregate([
      {
        $project: {
          trainingPhotos: 1,
        },
      },
      {
        $unwind: "$trainingPhotos",
      },
      {
        $group: {
          _id: null,
          allTrainingPhotos: { $push: "$trainingPhotos" },
        },
      },
      {
        $project: {
          _id: 0,
          allTrainingPhotos: 1,
        },
      },
    ]);

    if (!result || result.length === 0) {
      return next(new Errorhandler("Trainings not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Training images retrieved successfully",
      data: result[0].allTrainingPhotos,
    });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Failed to get training images", 500));
  }
});

// Get Yearly training report

export const getYearlyTrainingReport = CatchAsyncError(
  async (req, res, next) => {
    let financialYear = req.query.financial_year;

    try {
      if (!financialYear) {
        // If no financial year is provided, find the latest financial year
        const latestYearDoc = await Training.findOne()
          .sort({ financialYear: -1 })
          .select("financialYear")
          .exec();
        if (latestYearDoc) {
          financialYear = latestYearDoc.financialYear;
        } else {
          return res.status(404).json({ message: "No data available" });
        }
      }

      const result = await Training.aggregate([
        { $match: { financialYear } },
        {
          $group: {
            _id: "$financialYear",
            noOfTrainings: {
              $sum: {
                $cond: [{ $eq: ["$type", "Training"] }, 1, 0],
              },
            },
            noOfWorkshops: {
              $sum: {
                $cond: [{ $eq: ["$type", "Workshop"] }, 1, 0],
              },
            },
            noOfSeminars: {
              $sum: {
                $cond: [{ $eq: ["$type", "Seminar"] }, 1, 0],
              },
            },
            noOfWebinars: {
              $sum: {
                $cond: [{ $eq: ["$type", "Webinar"] }, 1, 0],
              },
            },
            noOfOnlineTrainings: {
              $sum: {
                $cond: [{ $eq: ["$onlineOffline", "Online"] }, 1, 0],
              },
            },
            noOfOfflineTrainings: {
              $sum: {
                $cond: [{ $eq: ["$onlineOffline", "Offline"] }, 1, 0],
              },
            },
            noOfERsTrained: { $sum: "$noOfERs" },
            noOfGPFunctionariesTrained: { $sum: "$noOfGPFunctionaries" },
            noOfMembersOfSHGsTrained: { $sum: "$noOfMembersOfSHGs" },
            noOfRepsFromVolOrgnsNGOsTrained: {
              $sum: "$noOfRepsFromVolOrgnsNGOs",
            },
            noOfRepsFromNatlStateInstnsTrained: {
              $sum: "$noOfRepsFromNatlStateInstns",
            },
            noOfPanchayatBandhusTrained: { $sum: "$noOfPanchayatBandhus" },
            noOfProjectStaffTrained: { $sum: "$noOfProjectStaffTrained" },
            totalOthersTrained: { $sum: "$others" },
            totalMalesTrained: { $sum: "$noOfMale" },
            totalFemalesTrained: { $sum: "$noOfFemale" },
            totalParticipantsTrained: { $sum: "$total" },
          },
        },
      ]);

      if (result.length === 0) {
        return next(new Errorhandler("No training reports found", 404));
      }

      res.status(200).json(result[0]);
    } catch (error) {
      return next(new Errorhandler("Failed to get training Reports", 500));
    }
  }
);

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
