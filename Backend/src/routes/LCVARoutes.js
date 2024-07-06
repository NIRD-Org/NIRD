import express from "express";
import {
  createLCVA,
  getAllLCVAs,
  getLCVAById,
  updateLCVA,
  deleteLCVA,
  approveLCVA,
  getLCVAs,
  getSimilarLcva,
} from "../controllers/LCVAController.js";
import { isAuth } from "../middlewares/auth.js";

const router = express.Router();

router.route("/create").post(isAuth, createLCVA);
// only for admins
router.route("/all").get(isAuth, getAllLCVAs);

// for homepage
router.route("/").get(getLCVAs);
router.route("/similar/:id").get(getSimilarLcva);

router.route("/:id").get(getLCVAById).put(updateLCVA).delete(deleteLCVA);
router.route("/:id/approve").put(approveLCVA);
export default router;
