import express from "express";
import { isAuth } from "../middlewares/auth.js";
import {
  createPoa1,
  getPoa1DataByState,
  getPoa1s,
  getPoalData,
  updatePoa1Data,
} from "../controllers/YfPoa1Controller.js";

const router = express.Router();
router.route("/create").post(isAuth, createPoa1);
router.route("/getUserPOAs").get(isAuth, getPoa1s);
router.route("/get/:id").get(isAuth, getPoalData);
router.route("/get").get(isAuth, getPoa1DataByState);
router.route("/update/:poaId").post(isAuth, updatePoa1Data);
export default router;
