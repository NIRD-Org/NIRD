import express from "express";
import {
  getAllKPIApprovals,
  getKPIApprovals,
} from "../controllers/kpiApprovalController.js";

const router = express.Router();

router.route("/all").get(getAllKPIApprovals);

router.route("/get-kpiapprovals").get(getKPIApprovals);

export default router;
