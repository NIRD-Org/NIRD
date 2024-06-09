import express from "express";
import { getGpByDistrict } from "../controllers/gpController.js";

const router = express.Router();

router.route("/dist/:dist").get(getGpByDistrict);
router.route("/taluk/:taluk").get(getGpByDistrict);

export default router;
