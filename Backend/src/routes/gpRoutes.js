import express from "express";
import {
  createGP,
  deleteGP,
  getGpByLocation,
} from "../controllers/gpController.js";

const router = express.Router();

router.route("/get").get(getGpByLocation);
router.route("/create").post(createGP);
router.route("/delete/:id").put(deleteGP);

export default router;
