import express from "express";
import {
  getAllKPI,
  getKPIByTheme,
  createKPI,
} from "../controllers/kpiController.js";

const router = express.Router();

router.route("/all").get(getAllKPI);
router.route("/theme/:theme").get(getKPIByTheme);
router.route("/create").post(createKPI);

export default router;
