import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/userModel.js";
import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { Errorhandler } from "../utils/errorHandler.js";

const getNewId = async () => {
  try {
    const maxDoc = await User.aggregate([
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

export const register = CatchAsyncError(async (req, res, next) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    if (user) {
      return next(new Errorhandler("User already exists", 400));
    }

    const id = await getNewId();
    req.body.id = id.toString();
    req.body.createdBy = req.user.id;

    user = new User(req.body);

    const salt = await bcrypt.genSalt(10);
    if (!req.body.password) req.body.password = "123456";
    user.password = await bcrypt.hash(req.body.password, salt);

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Signup failed", 500));
  }
});

export const login = CatchAsyncError(async (req, res, next) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;

    let user = await User.findOne({ username, status: "1" });
    if (!user) {
      return next(new Errorhandler("Invalid credentials", 400));
    }
    console.log(user);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new Errorhandler("Invalid credentials", 400));
    }

    const payload = {
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
    };

    const token = jwt.sign(payload, "secret", { expiresIn: "10 d" });
    res.setHeader("Authorization", `Bearer ${token}`);
    res.set("Access-Control-Expose-Headers", "Authorization");
    res.json({ token });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Failed to login", 500));
  }
});

export const changePassword = CatchAsyncError(async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findOne({ id: req.user.id });
    if (!user) {
      return next(new Errorhandler("User not found", 404));
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return next(new Errorhandler("Invalid credentials", 400));
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Failed to change password", 500));
  }
});

// Register multiple users

export const registerMultipleUsers = CatchAsyncError(async (req, res, next) => {
  try {
    const users = req.body;
    for (let user of users) {
      let existingUser = await User.findOne({ username: user.username });
      if (existingUser) {
        return next(new Errorhandler("User already exists", 400));
      }
      const id = await getNewId();
      user.id = id.toString();
      user.createdBy = req?.user?.id ?? "1";
      const newUser = new User(user);
      const salt = await bcrypt.genSalt(10);
      if (!user.password) user.password = "123456";
      newUser.password = await bcrypt.hash(user.password, salt);
      await newUser.save();
    }
    res.status(201).json({ message: "Users registered successfully" });
  } catch (err) {
    console.log("Error: " + err);
    return next(new Errorhandler("Failed to register multiple users", 500));
  }
});
