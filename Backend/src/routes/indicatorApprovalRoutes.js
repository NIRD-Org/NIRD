import {
  getIndicatorApprovals,
  updateIndicatorApproval,
} from "../controllers/indicatorApprovalController.js";
import { isAuth } from "../middlewares/auth.js";
import express from "express";
const router = express.Router();
router.use("/get-approvals", isAuth);

router.route("/get-approvals").get(getIndicatorApprovals);
router.route("/update/:id").put(updateIndicatorApproval);

export default router;
