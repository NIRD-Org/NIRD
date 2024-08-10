import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { SoeprDistrictModel } from "../models/soeprDistrictModel.js";
import { Errorhandler } from "../utils/errorHandler.js";

const getNewId = async () => {
  try {
    const maxDoc = await SoeprDistrictModel.aggregate([
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

    const newDistrict = new SoeprDistrictModel(req.body);
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
    const districtData = await SoeprDistrictModel.find({
      state_id: req.params.state,
      status: "1",
    }).sort({ name: 1 });
    /*  if (!districtData || districtData.length === 0) {
      return next(new Errorhandler("No District Data Found", 404));
    } */
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
    const districtData = await SoeprDistrictModel.findOneAndUpdate(
      { id: req.params.id },
      {
        status: "0",
      },
      {
        new: true,
      }
    );

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
    const districtData = await SoeprDistrictModel.findOneAndUpdate(
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

// Get district by id

export const getDistrictById = CatchAsyncError(async (req, res, next) => {
  try {
    const districtData = await SoeprDistrictModel.findOne({
      id: req.params.id,
    });
    if (!districtData) {
      return next(new Errorhandler("No District Data Found", 404));
    }
    res.status(200).json({
      success: true,
      message: "District Data Fetched Successfully",
      district: districtData,
    });
  } catch (error) {
    return next(new Errorhandler("Failed to fetch District", 500));
  }
});

// Controller to get all districts
export const getAllDistricts = CatchAsyncError(async (req, res, next) => {
  try {
    const filter = {};
    filter.status = "1";
    const { state_id, status } = req.query;
    if (state_id) filter.state_id = state_id;
    if (status) filter.status = status;

    const districts = await SoeprDistrictModel.aggregate([
      {
        $match: filter,
      },
      {
        $lookup: {
          from: "soeprstates",
          localField: "state_id",
          foreignField: "id",
          as: "state",
        },
      },
      {
        $unwind: "$state",
      },
      {
        $sort: {
          "state.name": 1,
        },
      },
    ]);

    res.status(200).json(districts);
  } catch (err) {
    return next(new Errorhandler("failed to get districts data", 500));
  }
});

// insert many districts

export const insertManyDistricts = CatchAsyncError(async (req, res, next) => {
  try {
    const districts = req.body;
    const savedStates = await SoeprDistrictModel.insertMany(districts);
    res.status(201).json({
      success: true,
      message: "Districts created successfully",
    });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Failed to create districts", 500));
  }
});
