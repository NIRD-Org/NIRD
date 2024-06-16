import express from "express";
import {
  getDistrictByState,
  createDistrict,
  deleteDistrict,
  updateDistrict,
  getDistrictById,
} from "../controllers/districtController.js";
import { isAuth } from "../middlewares/auth.js";

const router = express.Router();
router.use('/create',isAuth);
router.route("/state/:state").get(getDistrictByState);
router.route("/create").post(createDistrict);
router.route("/delete/:id").put(deleteDistrict);
router.route("/:id").put(updateDistrict);
router.route("/get-dist/:id").get(getDistrictById);

export default router;
