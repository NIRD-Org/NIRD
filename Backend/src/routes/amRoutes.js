import express from "express";
import {
  getAllAM,
  getAMById,
  createAM,
  deleteAM,
  updateAM,
  getAllAttendaceData,
  getAmAttendance,
  createLeave,
} from "../controllers/amController.js";
import { isAuth } from "../middlewares/auth.js";

const router = express.Router();

router.route("/all").get(isAuth, getAllAM);
router.route("/get-attendance").get(isAuth, getAmAttendance);

router.route("/create").post(isAuth, createAM);
router.route("/:id").get(getAMById);
router.route("/:id").delete(deleteAM);
router.route("/:id").put(updateAM);
router.route("/attendance/all").get(getAllAttendaceData);
router.route("/create/leave").post(isAuth, createLeave);

export default router;
