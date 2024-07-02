import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { BlockModel } from "../models/blockModel.js";
import { Errorhandler } from "../utils/errorHandler.js";

const getNewId = async () => {
  try {
    const maxDoc = await BlockModel.aggregate([
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

export const createblock = CatchAsyncError(async (req, res, next) => {
  try {
    const id = await getNewId();
    req.body.id = id.toString();
    req.body.created_by = req.user.id;
    const newblock = new BlockModel(req.body);
    await newblock.save();
    res.status(201).json({
      success: true,
      message: "block created successfully",
      block: newblock,
    });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Failed to create block", 500));
  }
});

// Controller to get all blocks
export const getAllblocks = CatchAsyncError(async (req, res, next) => {
  try {
    const filter = {};
    filter.status = "1";
    const { state_id, dist_id, status } = req.query;
    if (state_id) filter.state_id = state_id;
    if (dist_id) filter.dist_id = dist_id;
    if (status) filter.status = status;

    const blocks = await BlockModel.aggregate([
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
        $sort: {
          "state.name": 1,
          // "district.name": 1,
        },
      },
    ]);

    res.status(200).json(blocks);
  } catch (err) {
    return next(new Errorhandler("failed to get blocks data", 500));
  }
});

// Controller to get a block by ID
export const getblockById = CatchAsyncError(async (req, res, next) => {
  try {
    const block = await BlockModel.findOne({ id: req.params.id, status: "1" });
    if (!block) {
      return next(new Errorhandler("blocks data not found", 400));
    }
    res.status(200).json(block);
  } catch (err) {
    return next(new Errorhandler("failed to get blocks data", 500));
  }
});

// get block by states

export const getblocksByLocation = CatchAsyncError(async (req, res, next) => {
  try {
    const { state, dist } = req.query;

    const blocks = await BlockModel.find({ dist_id: dist, status: "1" }).sort({ name: 1 });
    if (!blocks || blocks.length === 0) {
      return next(new Errorhandler("blocks data not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "blocks fetched successfully",
      blocks,
    });
  } catch (err) {
    return next(new Errorhandler("Failed to get blocks data", 500));
  }
});

// deleteblock

export const deleteblock = CatchAsyncError(async (req, res, next) => {
  try {
    const block = await BlockModel.findOneAndUpdate(
      { id: req.params.id },
      {
        status: "0",
      },
      { new: true }
    );
    if (!block) {
      return next(new Errorhandler("Block not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "block deleted successfully",
      block,
    });
  } catch (err) {
    return next(new Errorhandler("Failed to delete block", 500));
  }
});

// Update the block

export const updateblock = CatchAsyncError(async (req, res, next) => {
  try {
    const block = await BlockModel.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (!block) {
      return next(new Errorhandler("Block not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "block updated successfully",
      block,
    });
  } catch (err) {
    return next(new Errorhandler("Failed to update block", 500));
  }
});

// get block by id

export const getBlockById = CatchAsyncError(async (req, res, next) => {
  try {
    const block = await BlockModel.findOne({ id: req.params.id });
    if (!block) {
      return next(new Errorhandler("Block not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Block fetched successfully",
      block,
    });
  } catch (err) {
    return next(new Errorhandler("Failed to get block", 500));
  }
});
