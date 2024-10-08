import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { SoeprLocationModel } from "../models/soeprLocationModel.js";
import { User } from "../models/userModel.js";
import { Errorhandler } from "../utils/errorHandler.js";

const getNewId = async () => {
  try {
    const maxDoc = await SoeprLocationModel.aggregate([
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
    const { user_id, userLocations } = req.body;
    const id = await getNewId();

    // Find For Existing user_id

    const existingUserLocation = await SoeprLocationModel.findOne({
      user_id,
    });
    if (existingUserLocation) {
      return next(new Errorhandler("Cannot Reassign User Location", 400));
    }

    const userLocation = await SoeprLocationModel.create({
      id,
      user_id,
      userLocations,
      created_by: req?.user?.id,
    });
    await User.findOneAndUpdate({ id: user_id }, { location_assigned: true });

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

// Get all users Location info -- Super Admin

export const getAllUserLocation = CatchAsyncError(async (req, res, next) => {
  try {
    const userLocation = await SoeprLocationModel.find();

    if (!userLocation) {
      return next(new Errorhandler("No user locations data found", 404));
    }

    res.status(200).json({ success: true, data: userLocation });
  } catch (error) {
    return next(new Errorhandler("Failed to get user location", 500));
  }
});

// Get the users location

export const getUserLocationById = CatchAsyncError(async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const userLocation = await SoeprLocationModel.findOne({ user_id });
    if (!userLocation) {
      return next(new Errorhandler("User locations data not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "User locations data by id fetched successfully",
      data: userLocation,
    });
  } catch (error) {
    console.log("Error: " + error);
    return next(new Errorhandler("Failed to get user location", 500));
  }
});

export const getUserLocation = CatchAsyncError(async (req, res, next) => {
  try {
    const user_id = req.user.id;
    // const user_id = "155";

    const [userLocation] = await SoeprLocationModel.aggregate([
      { $match: { user_id } },
      {
        $lookup: {
          from: "soeprstates",
          localField: "userLocations.state_ids",
          foreignField: "id",
          as: "states",
        },
      },
      {
        $lookup: {
          from: "soeprdistricts",
          localField: "userLocations.dist_ids",
          foreignField: "id",
          as: "districts",
        },
      },
    ]);
    if (!userLocation) {
      return next(new Errorhandler("User locations data not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "User locations data fetched successfully",
      data: userLocation,
    });
  } catch (error) {
    console.log("Error: " + error);
    return next(new Errorhandler("Failed to get user location", 500));
  }
});

export const updateUserLocation = CatchAsyncError(async (req, res, next) => {
  try {
    const { userLocations } = req.body;
    const { user_id } = req.params;
    const existingUserLocation = await SoeprLocationModel.findOne({
      user_id,
    });

    if (!existingUserLocation) {
      return next(new Errorhandler("User location not found", 404));
    }

    const userLocation = await SoeprLocationModel.findOneAndUpdate(
      { user_id },
      { userLocations },
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
