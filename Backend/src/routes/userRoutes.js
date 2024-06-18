import express from "express";
import { isAuth } from "../middlewares/auth.js";
import { getAllUsers } from "../controllers/userController.js";
const router = express.Router();

// router.use("/create", isAuth);
router.get("/all", isAuth, getAllUsers);

export default router;
