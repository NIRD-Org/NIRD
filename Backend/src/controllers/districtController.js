import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { DistrictModel } from "../models/districtModel.js";
import { Errorhandler } from "../utils/errorHandler.js";

const getNewId = async () => {
  try {
    const maxDoc = await DistrictModel.aggregate([
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

export const createDistrict = CatchAsyncError(async (req, res, next) => {
  try {
    const id = await getNewId();
    req.body.id = id.toString();
    req.body.created_by = req.user.id;
    
    const newDistrict = new DistrictModel(req.body);
    await newDistrict.save();
    res.status(201).json({
      success: true,
      message: "District created successfully",
      district: newDistrict,
    });
  } catch (error) {
    return next(new Errorhandler("Failed to create district", 500));
  }
});

export const getDistrictByState = CatchAsyncError(async (req, res, next) => {
  try {
    const districtData = await DistrictModel.find({
      state_id: req.params.state,
    });
    if (!districtData || districtData.length === 0) {
      return next(new Errorhandler("No District Data Found", 404));
    }
    res.status(200).json({
      success: true,
      message: "District Data Fetched Successfully",
      districts: districtData,
    });
  } catch (error) {
    return next(new Errorhandler("Failed to fetch District", 500));
  }
});

// Delete the district data - set status to 0

export const deleteDistrict = CatchAsyncError(async (req, res, next) => {
  try {
    const districtData = await DistrictModel.findOneAndUpdate(
      { id: req.params.id },
      {
        status: "0",
      },
      {
        new: true,
      }
    );
    if (!districtData) {
      return next(new Errorhandler("No District Data Found", 404));
    }
    res.status(200).json({
      success: true,
      message: "District Deleted Successfully",
    });
  } catch (error) {
    return next(new Errorhandler("Failed to delete District", 500));
  }
});

// Update district

export const updateDistrict = CatchAsyncError(async (req, res, next) => {
  try {
    const districtData = await DistrictModel.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    if (!districtData) {
      return next(new Errorhandler("No District Data Found", 404));
    }
    res.status(200).json({
      success: true,
      message: "District Updated Successfully",
      district: districtData,
    });
  } catch (error) {
    return next(new Errorhandler("Failed to update District", 500));
  }
});
