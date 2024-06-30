import express from "express";
import {
  deleteGpWiseKpiData,
  getAchievementsChart,
  getBlockRankingController,
  getGpWiseKpi,
  getGpWiseKpiChart,
  getGpWiseKpiData,
  getGpWiseKpiForApprover,
  getRankingController,
  reSubmitKpiData,
  submitKpiData,
} from "../controllers/gpWiseKpiController.js";

const router = express.Router();

router.route("/").get(getGpWiseKpi);
router.route("/data").get(getGpWiseKpiData);

// Submit the data from the YF
router.route("/submit").post(submitKpiData);

// Resubmit the data from YF

router.route("/resubmit").put(reSubmitKpiData);

// Get teh chart

router.route("/chart").get(getGpWiseKpiChart);
router.route("/achievement-chart").get(getAchievementsChart);

// router.route("/indicators").get(getGpWiseKpiDataWithPercentageController);

router.route("/delete/:id").put(deleteGpWiseKpiData);

// get Kpi details for approver

router.route("/approval-data").get(getGpWiseKpiForApprover);

router.route("/get-ranking").get(getRankingController);
router.route("/get-block-ranking").get(getBlockRankingController);

export default router;
