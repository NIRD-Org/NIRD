import express from "express";
import {
  getDistrictByState,
  createDistrict,
  deleteDistrict,
} from "../controllers/districtController.js";

const router = express.Router();

router.route("/state/:state").get(getDistrictByState);
router.route("/create").post(createDistrict);
router.route("/delete/:id").put(deleteDistrict);
export default router;
