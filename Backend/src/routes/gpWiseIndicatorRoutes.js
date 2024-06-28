import express from "express";
import {
  getGpWiseIndicatorDataWithPercentageController,
  getGpWiseIndicatorForApprover,
  reSubmitIndicatorData,
  submitIndicatorData,
} from "../controllers/gpWiseIndicator.js";

const router = express.Router();

// router.route("/").get(getGpWiseKpi);
// router.route("/data").get(getGpWiseKpiData);

// Submit the data from the YF
router.route("/submit").post(submitIndicatorData);
router.route("/resubmit").put(reSubmitIndicatorData);
router.route("/approval-data").get(getGpWiseIndicatorForApprover);

// Get teh chart

router.route("/indicators").get(getGpWiseIndicatorDataWithPercentageController);
// router.route("/delete/:id").put(deleteGpWiseKpiData);

export default router;
