import express from "express";
import {
  getAllKPIApprovals,
  getKPIApprovals,
  updateKPIApproval,
} from "../controllers/kpiApprovalController.js";
import { isAuth } from "../middlewares/auth.js";

const router = express.Router();
router.use("/get-kpiapprovals", isAuth);
router.route("/all").get(getAllKPIApprovals);

router.route("/get-kpiapprovals").get(getKPIApprovals);
router.route("/update/:id").put(updateKPIApproval);

export default router;
