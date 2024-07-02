import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { GpModel } from "../models/gpModel.js";
import { Errorhandler } from "../utils/errorHandler.js";

const getNewId = async () => {
  try {
    const maxDoc = await GpModel.aggregate([
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

export const createGP = CatchAsyncError(async (req, res, next) => {
  try {
    const id = await getNewId();
    req.body.id = id.toString();
    req.body.created_by = req.user.id;

    const newGP = new GpModel(req.body);
    await newGP.save();
    res.status(201).json({
      success: true,
      message: "GP created successfully",
      gp: newGP,
    });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Failed to create GP", 500));
  }
});

export const getGpByLocation = CatchAsyncError(async (req, res, next) => {
  try {
    const { state, dist, block } = req.query;

    let filter = {};
    if (state) filter.state_id = state;
    if (dist) {
      filter.dist_id = dist;
    }
    if (block) {
      filter.block_id = block;
    }

    filter.status = "1";

    const gram = await GpModel.find(filter).sort({ name: 1 });
    if (!gram || gram.length === 0) {
      return next(new Errorhandler("No Gram Panchayat Found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Gram Panchayat Fetched Successfully",
      gram,
    });
  } catch (error) {
    return next(new Errorhandler("Failed to get Gram Panchayat", 500));
  }
});

// Delete the gp - set the status to 0

export const deleteGP = CatchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const gp = await GpModel.findOneAndUpdate(id, { status: "0" }, { new: true });
    if (!gp) {
      return next(new Errorhandler("No Gram Panchayat Found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Gram Panchayat Deleted Successfully",
    });
  } catch (error) {
    return next(new Errorhandler("Failed to delete Gram Panchayat", 500));
  }
});

// update the gp

export const updateGP = CatchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const gp = await GpModel.findOneAndUpdate(id, req.body, { new: true });
    if (!gp) {
      return next(new Errorhandler("No Gram Panchayat Found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Gram Panchayat Updated Successfully",
      gp,
    });
  } catch (error) {
    return next(new Errorhandler("Failed to update Gram Panchayat", 500));
  }
});

// get gp by id

export const getGpById = CatchAsyncError(async (req, res, next) => {
  try {
    const gp = await GpModel.findOne({ id: req.params.id });
    if (!gp) {
      return next(new Errorhandler("Gram Panchayat not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Gram Panchayat Fetched Successfully",
      gp,
    });
  } catch (error) {
    return next(new Errorhandler("Failed to get Gram Panchayat", 500));
  }
});

// get all gps

export const getAllGps = CatchAsyncError(async (req, res, next) => {
  try {
    const filter = {};
    filter.status = "1";
    const { state_id, dist_id, block_id, status } = req.query;
    if (state_id) filter.state_id = state_id;
    if (dist_id) filter.dist_id = dist_id;
    if (block_id) filter.block_id = block_id;
    if (status) filter.status = status;

    const gps = await GpModel.aggregate([
      {
        $match: filter,
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
        $sort: {
          "state.name": 1,
          // "district.name": 1,
          // "block.name": 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Gram Panchayats Fetched Successfully",
      gps,
    });
  } catch (error) {
    return next(new Errorhandler("Failed to get Gram Panchayats", 500));
  }
});
