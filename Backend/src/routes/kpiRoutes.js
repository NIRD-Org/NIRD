import express from "express";
import { getAllKPI, getKPIByTheme } from "../controllers/kpiController.js";

const router = express.Router();

router.route("/all").get(getAllKPI);
router.route("/theme/:theme").get(getKPIByTheme);

export default router;
