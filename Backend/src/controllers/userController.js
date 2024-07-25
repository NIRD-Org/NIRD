import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { StateModel } from "../models/statesModel.js";
import { User } from "../models/userModel.js";
import { Errorhandler } from "../utils/errorHandler.js";

export const getAllUsers = CatchAsyncError(async (req, res, next) => {
  try {
    const filter = {};
    filter.status = { $ne: "0" };
    const { role, status } = req.query;
    if (req.user.role == 2) filter.createdBy = req.user.id;
    // if (status) filter.status = status;

    if (req.query.status) filter.status = req.query.status;
    if (role) filter.role = role;

    const users = await User.find(filter);
    res.status(200).json({ data: users });
  } catch (err) {
    console.log(err);
    return next(new Errorhandler("failed to get users data", 500));
  }
});
export const getUserById = CatchAsyncError(async (req, res, next) => {
  try {
    const user = await User.findOne({ id: req.params.id });

    if (!user) {
      return next(new Errorhandler("User not found", 404));
    }

    const state = await StateModel.findOne({ id: user.state_id });

    if (state) {
      user.state = state.name;
    }

    res.status(200).json({ data: user });
  } catch (err) {
    console.error(err);
    return next(new Errorhandler("Failed to get user data", 500));
  }
});

export const deleteUser = CatchAsyncError(async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate({ id: req.params.id }, { status: 0 }, { new: true });
    if (!user) {
      return next(new Errorhandler("User not found", 404));
    }
    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (err) {
    return next(new Errorhandler("Failed to delete user", 500));
  }
});

export const updateUser = CatchAsyncError(async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate({ id: req.params.id }, req.body, {
      new: true,
    });
    if (!user) {
      return next(new Errorhandler("User not found", 404));
    }
    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      user,
    });
  } catch (err) {
    return next(new Errorhandler("Failed to update user", 500));
  }
});
