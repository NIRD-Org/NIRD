import express from "express";
import { getGpByDistrict, getGpByTaluk } from "../controllers/gpController.js";

const router = express.Router();

router.route("/dist/:dist").get(getGpByDistrict);
router.route("/taluk/:taluk").get(getGpByTaluk);

export default router;
