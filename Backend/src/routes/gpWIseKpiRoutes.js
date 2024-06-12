import express from "express";
import {
  getGpWiseKpi,
  getGpWiseKpiChart,
  getGpWiseKpiData,
  getGpWiseKpiDataWithPercentageController,
} from "../controllers/gpWiseKpiController.js";

const router = express.Router();

router.route("/").get(getGpWiseKpi);
router.route("/data").get(getGpWiseKpiData);

// Get teh chart

router.route("/chart").get(getGpWiseKpiChart);
router.route("/indicators").get(getGpWiseKpiDataWithPercentageController);

export default router;
