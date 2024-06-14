import express from "express";
import {
  getAllKPI,
  getKPIByTheme,
  createKPI,
  deleteKPI,
  updateKPI,
} from "../controllers/kpiController.js";

const router = express.Router();

router.route("/all").get(getAllKPI);
router.route("/theme/:theme").get(getKPIByTheme);
router.route("/create").post(createKPI);
router.route("/delete/:id").put(deleteKPI);
router.route("/:id").put(updateKPI);

export default router;
