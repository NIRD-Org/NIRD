import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import AmModel from "../models/amModel.js";
import { UserLocationModel } from "../models/userLocationModel.js";
import { location_pipeline } from "../utils/pipeline.js";
import { uploadFile } from "../utils/uploadFile.js";

const getNewId = async () => {
  try {
    const maxDoc = await AmModel.aggregate([
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

export const getAllAM = CatchAsyncError(async (req, res, next) => {
  try {
    const filter = {};
    const { state_id, dist_id, block_id, gp_id } = req.query;
    if (state_id) filter.state_id = state_id;
    if (dist_id) filter.dist_id = dist_id;
    if (block_id) filter.block_id = block_id;
    if (gp_id) filter.gp_id = gp_id;
    if (req.user.role == 3) filter.created_by = req.user.id;
    if (req.user.role == 2 && !req.query.state_id) {
      const { userLocations } = await UserLocationModel.findOne({
        user_id: req.user.id,
      });
      const stateIds = userLocations.state_ids;
      filter.state_id = { $in: stateIds };
    }
    console.log(filter)
    const am = await AmModel.aggregate([{ $match: {} }]);

    res.status(200).json({
      status: "success",
      data: {
        am,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

export const getAMById = CatchAsyncError(async (req, res, next) => {
  const [am] = await AmModel.aggregate([{ $match: { id: req.params.id } }, ...location_pipeline]);
  res.status(200).json({
    status: "success",
    data: {
      am,
    },
  });
});

export const createAM = CatchAsyncError(async (req, res, next) => {
  const { am_upload_file } = req.files;
  const { url: fileUrl } = await uploadFile(am_upload_file.data);
  req.body.file = fileUrl;
  req.body.created_by = req?.user?.id;
  req.body.id = await getNewId();

  const newAM = await AmModel.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      am: newAM,
    },
  });
});

export const deleteAM = CatchAsyncError(async (req, res, next) => {
  const am = await AmModel.findOneAndDelete({ id: req.params.id });
  res.status(200).json({
    status: "success",
    data: {
      am,
    },
  });
});

export const updateAM = CatchAsyncError(async (req, res, next) => {
  const am = await AmModel.findOneAndUpdate({ id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      am,
    },
  });
});
