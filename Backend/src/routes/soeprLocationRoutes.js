import express from "express";
import {
  assignUserLocation,
  getAllUserLocation,
  getUserLocationById,
  updateUserLocation,
  getUserLocation,
} from "../controllers/soeprLocationController.js";
import { isAuth } from "../middlewares/auth.js";

const router = express.Router();

router.use("/create", isAuth);
router.route("/all").get(isAuth, getAllUserLocation);
router.route("/:user_id").get(isAuth, getUserLocationById);
router.get("/", isAuth, getUserLocation);
router.route("/:user_id").put(isAuth, updateUserLocation);

router.route("/create").post(assignUserLocation);

export default router;
