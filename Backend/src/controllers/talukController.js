import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { TalukModel } from "../models/talukModel.js";
import { Errorhandler } from "../utils/errorHandler.js";
const getNewId = async () => {
  try {
    const maxDoc = await TalukModel.aggregate([
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
export const createTaluk = CatchAsyncError(async (req, res, next) => {
  try {
    const id = await getNewId();
    req.body.id = id.toString();
    const newTaluk = new TalukModel(req.body);
    await newTaluk.save();
    res.status(201).json({
      success: true,
      message: "Taluk created successfully",
      taluk: newTaluk,
    });
  } catch (error) {
    return next(new Errorhandler("Failed to create taluk", 500));
  }
});

// Controller to get all taluks
export const getAllTaluks = CatchAsyncError(async (req, res, next) => {
  try {
    const taluks = await TalukModel.find();
    if (taluks.length === 0) {
      return next(new Errorhandler("Taluks data not found", 400));
    }
    res.status(200).json(taluks);
  } catch (err) {
    return next(new Errorhandler("failed to get Taluks data", 500));
  }
});

// Controller to get a taluk by ID
export const getTalukById = CatchAsyncError(async (req, res, next) => {
  try {
    const taluk = await TalukModel.findOne({ id: req.params.id });
    if (!taluk) {
      return next(new Errorhandler("Taluks data not found", 400));
    }
    res.status(200).json(taluk);
  } catch (err) {
    return next(new Errorhandler("failed to get Taluks data", 500));
  }
});

// get taluk by states

export const getTaluksByLocation = CatchAsyncError(async (req, res, next) => {
  try {
    const { state, dist } = req.query;

    const taluks = await TalukModel.find({ dist_id: dist });
    if (!taluks || taluks.length === 0) {
      return next(new Errorhandler("Taluks data not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Taluks fetched successfully",
      taluks,
    });
  } catch (err) {
    return next(new Errorhandler("Failed to get Taluks data", 500));
  }
});
