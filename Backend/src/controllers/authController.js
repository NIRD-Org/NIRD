import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/userModel.js";
import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { Errorhandler } from "../utils/errorHandler.js";

const getNewId = async () => {
  try {
    const maxDoc = await User.findOne().sort("-id").exec();
    const maxId = parseInt(maxDoc ? maxDoc.id : 0);
    return maxId + 1;
  } catch (error) {
    console.log(error);
  }
};

export const register = CatchAsyncError(async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return next(new Errorhandler("User already exists", 400));
    }

    const id = await getNewId();
    req.body.id = id.toString();

    user = new User(req.body);

    const salt = await bcrypt.genSalt(10);
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
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return next(new Errorhandler("Invalid credentials", 400));
    }
    console.log(user);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new Errorhandler("Invalid credentials", 400));
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, "secret", { expiresIn: 3600 }, (err, token) => {
      if (err) return next(new Errorhandler("Token generation failed", 500));
      res.json({ token });
    });
  } catch (error) {
    console.log(error);
    return next(new Errorhandler("Failed to login", 500));
  }
});
