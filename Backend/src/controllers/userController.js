import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userModel.js";
import { Errorhandler } from "../utils/errorHandler.js";

export const getAllUsers = CatchAsyncError(async (req, res, next) => {
  try {
    const filter = {};
    const {role} = req.query;

    if(role) filter.role = role;

    const users = await User.find(filter);
    res.status(200).json({data:users});
  } catch (err) {
    return next(new Errorhandler("failed to get users data", 500));
  }
});
