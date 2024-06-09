// Get all the themes

import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { ThemeModel } from "../models/themeModel.js";
import { Errorhandler } from "../utils/errorHandler.js";

export const createTheme = CatchAsyncError(async (req, res, next) => {
  try {
    const {
      id,
      theme_name,
      status,
      created_by,
      created_at,
      modified_by,
      modified_at,
      flag,
    } = req.body;

    const newTheme = new ThemeModel({
      id,
      theme_name,
      status,
      created_by,
      created_at,
      modified_by,
      modified_at,
      flag,
    });

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
    const themes = await ThemeModel.find();
    if (!themes || themes.length === 0) {
      return next(new Errorhandler("No themes found", 404));
    }

    res.status(200).json({
      status: "success",
      themes,
    });
  } catch (error) {
    return next(new Errorhandler("Failed to get all the themes", 500));
  }
});
