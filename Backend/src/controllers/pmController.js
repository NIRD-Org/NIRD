import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import PmModel from "../models/pmModel.js";
import { location_pipeline } from "../utils/pipeline.js";
import { uploadFile } from "../utils/uploadFile.js";

export const getAllPM = CatchAsyncError(async (req, res, next) => {
  const filter = {};
  if (req.query.state_id) filter.state_id = req.query.state_id;
  if (req.query.dist_id) filter.dist_id = req.query.dist_id;
  if (req.query.block_id) filter.block_id = req.query.block_id;
  if (req.query.gp_id) filter.gp_id = req.query.gp_id;

  const pm = await PmModel.aggregate([{ $match: filter }, ...location_pipeline]);

  res.status(200).json({
    status: "success",
    data: {
      pm,
    },
  });
});

export const getPMById = CatchAsyncError(async (req, res, next) => {
  const [pm] = await PmModel.aggregate([{ $match: { id: req.params.id } }, ...location_pipeline]);
  res.status(200).json({
    status: "success",
    data: {
      pm,
    },
  });
});

export const createPM = CatchAsyncError(async (req, res, next) => {
  const { pm_file } = req.files;
  const { url: fileUrl } = await uploadFile(pm_file.data);
  req.body.file = fileUrl;

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
