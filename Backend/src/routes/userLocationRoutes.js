import express from "express";
import {
  assignUserLocation,
  getUserLocation,
  getUserLocationById,
  updateUserLocation,
} from "../controllers/userLocationController.js";

const router = express.Router();

router.route("/all").get(getUserLocation);
router.route("/:user_id").get(getUserLocationById);

router.route("/:user_id").put(updateUserLocation);

router.route("/create").post(assignUserLocation);

export default router;
