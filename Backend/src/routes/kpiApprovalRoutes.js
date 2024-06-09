import express from "express";
import {
  getAllKPIApprovals,
  getKPIApprovals,
  createKPIApproval,
} from "../controllers/kpiApprovalController.js";

const router = express.Router();

router.route("/all").get(getAllKPIApprovals);

router.route("/get-kpiapprovals").get(getKPIApprovals);
router.route("/create").post(createKPIApproval);

export default router;
