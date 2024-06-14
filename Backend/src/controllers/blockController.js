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
    const newblock = new BlockModel(req.body);
    await newblock.save();
    res.status(201).json({
      success: true,
      message: "block created successfully",
      block: newblock,
    });
  } catch (error) {
    return next(new Errorhandler("Failed to create block", 500));
  }
});

// Controller to get all blocks
export const getAllblocks = CatchAsyncError(async (req, res, next) => {
  try {
    const blocks = await BlockModel.find();
    if (blocks.length === 0) {
      return next(new Errorhandler("blocks data not found", 400));
    }
    res.status(200).json(blocks);
  } catch (err) {
    return next(new Errorhandler("failed to get blocks data", 500));
  }
});

// Controller to get a block by ID
export const getblockById = CatchAsyncError(async (req, res, next) => {
  try {
    const block = await BlockModel.findOne({ id: req.params.id });
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

    const blocks = await BlockModel.find({ dist_id: dist });
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
