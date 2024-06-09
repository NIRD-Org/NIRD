import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { StateModel } from "../models/statesModel.js";
import { Errorhandler } from "../utils/errorHandler.js";

export const createState = CatchAsyncError(async (req, res, next) => {
  try {
    const {
      id,
      lgd_code,
      name,
      state_shortcode,
      country_id,
      state_icon,
      status,
      created_by,
      created_at,
      modified_by,
      modified_at,
    } = req.body;

    const newState = new StateModel({
      id,
      lgd_code,
      name,
      state_shortcode,
      country_id,
      state_icon,
      status,
      created_by,
      created_at,
      modified_by,
      modified_at,
    });

    await newState.save();

    res.status(201).json({
      success: true,
      message: "State created successfully",
      state: newState,
    });
  } catch (error) {
    return next(new Errorhandler("Failed to create state", 500));
  }
});

export const getAllStates = CatchAsyncError(async (req, res, next) => {
  try {
    const states = await StateModel.find();
    if (!states || states.length === 0) {
      return next(new Errorhandler("No States Found", 404));
    }
    res.status(200).json({ success: true, message: "States fetched", states });
  } catch (err) {
    return next(new Errorhandler("Failed to fetch states", 500));
  }
});

// Controller to get a state by ID
export const getStateById = CatchAsyncError(async (req, res, next) => {
  try {
    const state = await StateModel.findOne({ id: req.params.id });
    if (!state) {
      return next(new Errorhandler("State not found", 404));
    }
    res.status(200).json({ message: "State fetched", state });
  } catch (err) {
    return next(new Errorhandler("Failed to fetch state", 500));
  }
});
