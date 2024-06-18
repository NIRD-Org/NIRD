import express from "express";

import { isAuth } from "../middlewares/auth.js";
import {
  createPanchayatDetails,
  getPanchayatDetails,
} from "../controllers/gpDetailsController.js";

const router = express.Router();
router.use("/create", isAuth);
router.route("/create").post(createPanchayatDetails);
router.route("/get").get(getPanchayatDetails);
export default router;
