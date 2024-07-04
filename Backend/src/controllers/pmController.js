import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import PmModel from "../models/pmModel.js";
import { UserLocationModel } from "../models/userLocationModel.js";
import { location_pipeline } from "../utils/pipeline.js";
import { uploadFile } from "../utils/uploadFile.js";

const getNewId = async () => {
  try {
    const maxDoc = await PmModel.aggregate([
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

export const getAllPM = CatchAsyncError(async (req, res, next) => {
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
    console.log(filter);
    // const pm = await PmModel.aggregate([{ $match: {} }]);
    const pm = await PmModel.find(filter);

    res.status(200).json({
      status: "success",
      data: pm,
    });
  } catch (error) {
    console.log(error);
  }
});

export const getPMById = CatchAsyncError(async (req, res, next) => {
  // const [pm] = await PmModel.aggregate([{ $match: { id: req.params.id } }, ...location_pipeline]);
  const pm = await PmModel.findOne({ id: req.params.id });

  res.status(200).json({
    status: "success",
    data: pm,
  });
});

export const createPM = CatchAsyncError(async (req, res, next) => {
  const { pm_upload_file } = req.files;
  const { url: fileUrl } = await uploadFile(pm_upload_file.data);
  req.body.file = fileUrl;
  req.body.created_by = req?.user?.id;
  req.body.id = await getNewId();

  const newPM = await PmModel.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      pm: newPM,
    },
  });
});

export const deletePM = CatchAsyncError(async (req, res, next) => {
  const pm = await PmModel.findOneAndDelete({ id: req.params.id });
  res.status(200).json({
    status: "success",
    data: {
      pm,
    },
  });
});

export const updatePM = CatchAsyncError(async (req, res, next) => {
  const pm = await PmModel.findOneAndUpdate({ id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      pm,
    },
  });
});
