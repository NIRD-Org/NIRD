import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { UserLocationModel } from "../models/userLocationModel.js";
import { Errorhandler } from "../utils/errorHandler.js";

const getNewId = async () => {
  try {
    const maxDoc = await UserLocationModel.aggregate([
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
export const assignUserLocation = CatchAsyncError(async (req, res, next) => {
  try {
    const { user_id, state_id, dist_id } = req.body;
    const id = await getNewId();
    const userLocation = await UserLocationModel.create({
      id,
      user_id,
      state_id,
      dist_id,
    });

    if (!userLocation) {
      return next(new Errorhandler("Failed to assign user location", 500));
    }

    res
      .status(201)
      .json({ success: true, message: "User Location has been assigned" });
  } catch (error) {
    console.log("Error: " + error);
    return next(new Errorhandler("Failed to assign user location", 500));
  }
});

// Get all users Location info

export const getUserLocation = CatchAsyncError(async (req, res, next) => {
  try {
    const userLocation = await UserLocationModel.find();

    if (!userLocation) {
      return next(new Errorhandler("No user locations data found", 404));
    }

    res.status(200).json({ success: true, userLocation });
  } catch (error) {
    return next(new Errorhandler("Failed to get user location", 500));
  }
});

export const getUserLocationById = CatchAsyncError(async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const userLocation = await UserLocationModel.findOne({ user_id });
    if (!userLocation) {
      return next(new Errorhandler("User locations data not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "User locations data fetched successfully",
      userLocation,
    });
  } catch (error) {
    console.log("Error: " + error);
    return next(new Errorhandler("Failed to get user location", 500));
  }
});

export const updateUserLocation = CatchAsyncError(async (req, res, next) => {
  try {
    const { state_id, dist_id } = req.body;
    const { user_id } = req.params;
    const userLocation = await UserLocationModel.findOneAndUpdate(
      { user_id },
      { state_id, dist_id },
      { new: true }
    );

    if (!userLocation) {
      return next(new Errorhandler("Failed to update user location", 500));
    }

    res
      .status(201)
      .json({ success: true, message: "User Location has been updated" });
  } catch (err) {
    console.log("Error: " + err);
    return next(new Errorhandler("Failed to update user location", 500));
  }
});
