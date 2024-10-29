import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import ejs from "ejs";
import path from "path";
import { User } from "../models/userModel.js";
import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { Errorhandler } from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendMail.js";

const __dirname = path.resolve();

// Helper function to get new ID
const getNewId = async () => {
  try {
    const maxDoc = await User.aggregate([
      { $addFields: { numericId: { $toInt: "$id" } } },
      { $sort: { numericId: -1 } },
      { $limit: 1 },
    ]).exec();

    return maxDoc.length > 0 ? maxDoc[0].numericId + 1 : 1;
  } catch (error) {
    throw new Errorhandler("Failed to get new ID", 500);
  }
};

// Register a new user
export const register = CatchAsyncError(async (req, res, next) => {
  let user = await User.findOne({ username: req.body.username });
  if (user) return next(new Errorhandler("User already exists", 400));

  const id = await getNewId();
  req.body.id = id.toString();
  req.body.createdBy = req.user?.id;

  user = new User(req.body);
  if (!req.body.password) req.body.password = "123456";

  user.password = await bcrypt.hash(req.body.password, 10);
  await user.save();

  res.status(201).json({ message: "User registered successfully" });
});

// User login
export const login = CatchAsyncError(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, status: "1" });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new Errorhandler("Invalid credentials", 400));
  }

  const payload = {
    id: user.id,
    name: user.name,
    username: user.username,
    role: user.role,
  };

  const token = jwt.sign(payload, "secret", { expiresIn: "10d" });
  res.setHeader("Authorization", `Bearer ${token}`);
  res.set("Access-Control-Expose-Headers", "Authorization");

  res.json({ token });
});

// Change user password
export const changePassword = CatchAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findOne({ id: req.user.id });

  if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
    return next(new Errorhandler("Invalid credentials", 400));
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.status(200).json({ message: "Password changed successfully" });
});

// Register multiple users
export const registerMultipleUsers = CatchAsyncError(async (req, res, next) => {
  const users = req.body;

  for (const userData of users) {
    if (await User.findOne({ username: userData.username })) {
      return next(
        new Errorhandler(`User ${userData.username} already exists`, 400)
      );
    }

    const id = await getNewId();
    userData.id = id.toString();
    userData.createdBy = req.user?.id || "1";

    const newUser = new User(userData);
    newUser.password = await bcrypt.hash(userData.password || "123456", 10);

    await newUser.save();
  }

  res.status(201).json({ message: "Users registered successfully" });
});

// Send reset password email
export const sendResetPassword = CatchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return next(new Errorhandler("User not registered", 400));

  const resetToken = crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  const resetUrl = `${process.env.CLIENT_URL}/password/reset/${resetToken}`;
  const html = await ejs.renderFile(
    path.join(__dirname, "/src/emails/resetPassword.ejs"),
    { user, resetUrl }
  );

  await sendEmail({ to: user.email, subject: "Password Reset", html });
  await user.save();

  res.status(200).json({ message: "Please check your mail" });
});

// Reset password using token
export const resetPassword = CatchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) return next(new Errorhandler("Invalid or expired token", 400));

  const { password, confirmPassword } = req.body;
  if (!password || !confirmPassword || password !== confirmPassword) {
    return next(new Errorhandler("Passwords do not match or are missing", 400));
  }

  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  const html = await ejs.renderFile(
    path.join(__dirname, "/src/emails/passwordSuccessfull.ejs"),
    { user }
  );
  await sendEmail({ to: user.email, subject: "Password Reset Success", html });

  await user.save();

  res.status(200).json({ message: "Password has been updated successfully" });
});
