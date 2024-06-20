import express from "express";

import { isAuth } from "../middlewares/auth.js";
import {
  createYfInsights,
  getAllYfInsights,
  updateYfInsights,
} from "../controllers/yfInsightsController.js";

const router = express.Router();

// router.use("/create", isAuth);
router.route("/create").post(createYfInsights);
router.route("/get").get(getAllYfInsights);
router.route("/update").put(updateYfInsights);

export default router;
