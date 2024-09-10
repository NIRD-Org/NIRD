import express from "express";
import {
  changePassword,
  login,
  register,
  registerMultipleUsers,
  resetPassword,
  sendResetPassword,
} from "../controllers/authController.js";
import { isAuth } from "../middlewares/auth.js";
const router = express.Router();

router.route("/register").post(isAuth, register);
router.route("/login").post(login);
router.route("/change-password").post(isAuth, changePassword);
router.route("/reset-password").post(sendResetPassword);
router.route("/change-password/:token").post(resetPassword);

router.route("/many").post(registerMultipleUsers);
export default router;
