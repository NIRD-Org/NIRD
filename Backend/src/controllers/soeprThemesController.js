// Get all the themes

import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { SoeprThemeModel } from "../models/soeprThemesModel.js";
import { Errorhandler } from "../utils/errorHandler.js";
const getNewId = async () => {
  try {
    const maxDoc = await SoeprThemeModel.aggregate([
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
export const createTheme = CatchAsyncError(async (req, res, next) => {
  try {
    const id = await getNewId();
    req.body.id = id.toString();
    req.body.created_by = req.user.id;

    const newTheme = new SoeprThemeModel(req.body);
    await newTheme.save();
    res.status(201).json({
      success: true,
      message: "Theme created successfully",
      theme: newTheme,
    });
  } catch (error) {
    return next(new Errorhandler("Failed to create theme", 500));
  }
});

export const getAllThemes = CatchAsyncError(async (req, res, next) => {
  try {
    const filter = {};
    filter.status = "1";
    const { status } = req.query;
    if (status) filter.status = status;

    const themes = await SoeprThemeModel.find(filter).sort({ id: 1 });

    res.status(200).json({
      status: "success",
      themes,
    });
  } catch (error) {
    return next(new Errorhandler("Failed to get all the themes", 500));
  }
});

// Delete theme - set status to "0"

export const deleteTheme = CatchAsyncError(async (req, res, next) => {
  try {
    const theme = await SoeprThemeModel.findOneAndUpdate(
      { id: req.params.id },
      { status: 0 },
      { new: true }
    );
    if (!theme) {
      return next(new Errorhandler("Theme not found", 404));
    }
    res.status(200).json({
      status: "success",
      message: "Theme deleted successfully",
      theme,
    });
  } catch (error) {
    return next(new Errorhandler("Failed to delete theme", 500));
  }
});

// Update theme

export const updateTheme = CatchAsyncError(async (req, res, next) => {
  try {
    const theme = await SoeprThemeModel.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!theme) {
      return next(new Errorhandler("Theme not found", 404));
    }
    res.status(200).json({
      status: "success",
      message: "Theme updated successfully",
      theme,
    });
  } catch (error) {
    return next(new Errorhandler("Failed to update theme", 500));
  }
});

// get theme by id

export const getThemeById = CatchAsyncError(async (req, res, next) => {
  try {
    const theme = await SoeprThemeModel.findOne({ id: req.params.id });
    if (!theme) {
      return next(new Errorhandler("Theme not found", 404));
    }
    res.status(200).json({
      status: "success",
      message: "Theme Fetched Successfully",
      theme,
    });
  } catch (error) {
    return next(new Errorhandler("Failed to get Theme", 500));
  }
});
