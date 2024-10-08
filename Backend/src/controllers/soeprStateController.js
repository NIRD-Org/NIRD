import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { SoeprStateModel } from "../models/soeprStateModel.js";
import { Errorhandler } from "../utils/errorHandler.js";
const getNewId = async () => {
  try {
    const maxDoc = await SoeprStateModel.aggregate([
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

export const createState = CatchAsyncError(async (req, res, next) => {
  try {
    const id = await getNewId();
    req.body.id = id.toString();

    req.body.created_by = req.user.id;
    const newState = new SoeprStateModel(req.body);
    await newState.save();

    res.status(201).json({
      success: true,
      message: "State created successfully",
      state: newState,
    });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Failed to create state", 500));
  }
});

export const getAllStates = CatchAsyncError(async (req, res, next) => {
  try {
    const filter = {};
    filter.status = "1";
    if (req.query.status) filter.status = req.query.status;

    const states = await SoeprStateModel.find(filter).sort({
      name: 1,
    });
    res.status(200).json({ success: true, message: "States fetched", states });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Failed to fetch states", 500));
  }
});

// Controller to get a state by ID
export const getStateById = CatchAsyncError(async (req, res, next) => {
  try {
    const state = await SoeprStateModel.findOne({ id: req.params.id });
    if (!state) {
      return next(new Errorhandler("State not found", 404));
    }
    res.status(200).json({ message: "State fetched", state });
  } catch (err) {
    return next(new Errorhandler("Failed to fetch state", 500));
  }
});

// Delete a state - set the status to "0"

export const deleteState = CatchAsyncError(async (req, res, next) => {
  try {
    const state = await SoeprStateModel.findOne({ id: req.params.id });
    if (!state) {
      return next(new Errorhandler("State not found", 404));
    }
    state.status = "0";
    await state.save();
    res.status(200).json({ success: true, message: "State deleted" });
  } catch (err) {
    return next(new Errorhandler("Failed to delete state", 500));
  }
});

// Update state

export const updateState = CatchAsyncError(async (req, res, next) => {
  try {
    const state = await SoeprStateModel.findOne({ id: req.params.id });
    if (!state) {
      return next(new Errorhandler("State not found", 404));
    }
    state.name = req.body.name;
    await state.save();
    res.status(200).json({ success: true, message: "State updated" });
  } catch (err) {
    return next(new Errorhandler("Failed to update state", 500));
  }
});

// insert many states

export const insertManyStates = CatchAsyncError(async (req, res, next) => {
  try {
    const states = req.body;
    const savedStates = await SoeprStateModel.insertMany(states);
    res.status(201).json({
      success: true,
      message: "States created successfully",
    });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Failed to create states", 500));
  }
});
