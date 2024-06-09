import express from "express";
import { getGpWiseKpi } from "../controllers/gpWiseKpiController.js";

const router = express.Router();

router.route("/").get(getGpWiseKpi);

export default router;
