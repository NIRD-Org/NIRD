import express from "express";
import {
  getDistrictByState,
  createDistrict,
} from "../controllers/districtController.js";

const router = express.Router();

router.route("/state/:state").get(getDistrictByState);
router.route("/create").post(createDistrict);

export default router;
