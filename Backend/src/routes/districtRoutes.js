import express from "express";
import {
  getDistrictByState,
  createDistrict,
  deleteDistrict,
  updateDistrict,
} from "../controllers/districtController.js";

const router = express.Router();

router.route("/state/:state").get(getDistrictByState);
router.route("/create").post(createDistrict);
router.route("/delete/:id").put(deleteDistrict);
router.route("/:id").put(updateDistrict);

export default router;
