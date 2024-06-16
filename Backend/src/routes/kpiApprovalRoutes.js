import express from "express";
import {
  getAllKPIApprovals,
  getKPIApprovals,
  updateKPIApproval,
} from "../controllers/kpiApprovalController.js";

const router = express.Router();

router.route("/all").get(getAllKPIApprovals);

router.route("/get-kpiapprovals").get(getKPIApprovals);
router.route("/update/:id").put(updateKPIApproval);

export default router;
