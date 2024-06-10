import express from "express";
import {
  getGpWiseKpi,
  getGpWiseKpiChart,
  getGpWiseKpiDataWithPercentageController,
} from "../controllers/gpWiseKpiController.js";

const router = express.Router();

router.route("/").get(getGpWiseKpi);
// Get teh chart

router.route("/chart").get(getGpWiseKpiChart);
router.route("/indicators").get(getGpWiseKpiDataWithPercentageController);

export default router;
