import express from "express";
import {
  getGpWiseIndicatorDataWithPercentageController,
  getGpWiseIndicatorForApprover,
  reSubmitIndicatorData,
  submitIndicatorData,
} from "../controllers/gpWiseIndicator.js";
import { isAuth } from "../middlewares/auth.js";

const router = express.Router();

router.use("/submit", isAuth);

// Submit the data from the YF
router.route("/submit").post(submitIndicatorData);
router.route("/resubmit").put(reSubmitIndicatorData);
router.route("/approval-data").get(getGpWiseIndicatorForApprover);

// Get teh chart

router.route("/indicators").get(getGpWiseIndicatorDataWithPercentageController);
// router.route("/delete/:id").put(deleteGpWiseKpiData);

export default router;
