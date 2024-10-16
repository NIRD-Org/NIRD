import express from "express";
import {
  deletesoeprKpiData,
  getsoeprKpi,
  getsoeprKpiData,
  getsoeprKpiForApprover,
  getSoerAdminKPIData,
  submitKpiData,
} from "../controllers/soeprKpiDataController.js";
import { isAuth } from "../middlewares/auth.js";

const router = express.Router();

router.route("/").get(isAuth, getsoeprKpi);
router.route("/data").get(getsoeprKpiData);

// Submit the data from the Soepr
router.route("/submit").post(isAuth, submitKpiData);

router.route("/approval-data").get(getsoeprKpiForApprover);

// router.route("/resubmit").put(reSubmitKpiData);
router.route("/kpi-data-admin").get(isAuth, getSoerAdminKPIData);
router.route("/delete/:id").put(isAuth, deletesoeprKpiData);

export default router;
