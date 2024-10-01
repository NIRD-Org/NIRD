import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { SoeprStateModel } from "../models/soeprStateModel.js";
import { StateModel } from "../models/statesModel.js";
import { User } from "../models/userModel.js";
import { Errorhandler } from "../utils/errorHandler.js";
import { uploadFile } from "../utils/uploadFile.js";
export const getAllUsers = CatchAsyncError(async (req, res, next) => {
  try {
    const filter = {};
    filter.status = "1";
    const { role, status } = req.query;
    if (req.user.role == 2) filter.createdBy = req.user.id;

    if (req.query.status) filter.status = req.query.status;
    if (role) filter.role = parseInt(role);

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
    let state;
    if (user.role === 4 || user.role === 5) {
      state = await SoeprStateModel.findOne({ id: user.state_id });
    } else {
      state = await StateModel.findOne({ id: user.state_id });
    }
    res
      .status(200)
      .json({ data: { user, state_name: state?.name, state_id: state?.id } });
  } catch (err) {
    console.error(err);
    return next(new Errorhandler("Failed to get user data", 500));
  }
});

export const deleteUser = CatchAsyncError(async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate(
      { id: req.params.id },
      { status: 0 },
      { new: true }
    );
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
    const { photo } = req?.files || "";
    if (photo) {
      const photo1 = await uploadFile(photo.data);
      req.body.photo = photo1;
    }
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
    console.log(err);
    return next(new Errorhandler("Failed to update user", 500));
  }
});

export const updateMany = CatchAsyncError(async (req, res, next) => {
  try {
    const updatedUsers = await User.updateMany(
      { role: 1 },
      { $rename: { efDateFrom: "dojNIRDPR" } }
    );

    res.status(200).json({
      status: "success",
      message: "Users Updated successfully",
    });
  } catch (err) {
    console.log(err);
    return next(new Errorhandler("Failed to delete users", 500));
  }
});
