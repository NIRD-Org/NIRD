import express from "express";
import {
  deleteGpWiseKpiData,
  getGpWiseKpi,
  getGpWiseKpiChart,
  getGpWiseKpiData,
  getGpWiseKpiForApprover,
  submitKpiData,
} from "../controllers/gpWiseKpiController.js";

const router = express.Router();

router.route("/").get(getGpWiseKpi);
router.route("/data").get(getGpWiseKpiData);

// Submit the data from the YF
router.route("/submit").post(submitKpiData);

// Get teh chart

router.route("/chart").get(getGpWiseKpiChart);
// router.route("/indicators").get(getGpWiseKpiDataWithPercentageController);

router.route("/delete/:id").put(deleteGpWiseKpiData);

// get Kpi details for approver

router.route("/approval-data").get(getGpWiseKpiForApprover);

export default router;
