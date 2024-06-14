import express from "express";
import {
  createGP,
  deleteGP,
  getGpByLocation,
  updateGP,
} from "../controllers/gpController.js";

const router = express.Router();

router.route("/get").get(getGpByLocation);
router.route("/create").post(createGP);
router.route("/delete/:id").put(deleteGP);
router.route("/:id").put(updateGP);

export default router;
