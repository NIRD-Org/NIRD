import express from "express";
import { getDistrictByState } from "../controllers/districtController.js";

const router = express.Router();

router.route("/state/:state").get(getDistrictByState);

export default router;
