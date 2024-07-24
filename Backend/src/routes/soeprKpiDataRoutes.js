import express from "express";
import {
  deletesoeprKpiData,
  getsoeprKpi,
  getsoeprKpiData,
  submitKpiData,
} from "../controllers/soeprKpiDataController.js";

const router = express.Router();

router.route("/").get(getsoeprKpi);
router.route("/data").get(getsoeprKpiData);

// Submit the data from the Soepr
router.route("/submit").post(submitKpiData);

// Resubmit the data from Soepr

// router.route("/resubmit").put(reSubmitKpiData);

router.route("/delete/:id").put(deletesoeprKpiData);

export default router;
