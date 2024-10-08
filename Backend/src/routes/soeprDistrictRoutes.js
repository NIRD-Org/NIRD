import express from "express";
import {
  getDistrictByState,
  createDistrict,
  deleteDistrict,
  updateDistrict,
  getDistrictById,
  getAllDistricts,
  insertManyDistricts,
} from "../controllers/soeprDistrictController.js";
import { isAuth } from "../middlewares/auth.js";

const router = express.Router();
router.use("/create", isAuth);
router.route("/all").get(getAllDistricts);
router.route("/state/:state").get(getDistrictByState);
router.route("/create").post(createDistrict);
router.route("/:id").delete(deleteDistrict);
router.route("/:id").put(updateDistrict);
router.route("/:id").get(getDistrictById);
router.route("/get-dist/:id").get(getDistrictById);
router.route("/many").post(insertManyDistricts);

export default router;
