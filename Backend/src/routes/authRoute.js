import express from "express"
import { changePassword, login, register } from "../controllers/authController.js";
import { isAuth } from "../middlewares/auth.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/change-password").post(isAuth,changePassword);

export default router;
