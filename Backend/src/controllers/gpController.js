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
    const newGP = new GpModel(req.body);
    await newGP.save();
    res.status(201).json({
      success: true,
      message: "GP created successfully",
      gp: newGP,
    });
  } catch (error) {
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

    const gram = await GpModel.find(filter);
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
    const gp = await GpModel.findOneAndUpdate(
      id,
      { status: "0" },
      { new: true }
    );
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
