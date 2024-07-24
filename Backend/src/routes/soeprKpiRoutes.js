import express from "express";
import { isAuth } from "../middlewares/auth.js";
import {
  createKPI,
  deleteKPI,
  getAllKPI,
  getKpiById,
  getKPIByTheme,
  insertManyKPI,
  updateKPI,
} from "../controllers/soeprKpiController.js";

const router = express.Router();

router.use("/create", isAuth);
router.route("/all").get(getAllKPI);
router.route("/theme/:theme").get(getKPIByTheme);
router.route("/create").post(createKPI);
router.route("/:id").delete(deleteKPI);
router.route("/:id").put(updateKPI);
router.route("/many").post(insertManyKPI);
router.route("/:id").get(getKpiById);

export default router;
