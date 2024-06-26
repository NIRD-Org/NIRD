import express from "express";
import {
  getAllKPI,
  getKPIByTheme,
  createKPI,
  deleteKPI,
  updateKPI,
  insertManyKPI,
  getKpiById
} from "../controllers/kpiController.js";
import { isAuth } from "../middlewares/auth.js";

const router = express.Router();

router.use("/create", isAuth);
router.route("/all").get(getAllKPI);
router.route("/theme/:theme").get(getKPIByTheme);
router.route("/create").post(createKPI);
router.route("/:id").delete(deleteKPI);
router.route("/:id").put(updateKPI);
router.route("/many").post(insertManyKPI);
router.route('/:id').get(getKpiById)

export default router;
