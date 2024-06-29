import express from "express";

import { isAuth } from "../middlewares/auth.js";
import {
  createPanchayatDetails,
  getPanchayatDetails,
  getPanchayatDetailsById,
  updatePanchayatDetails,
  getAllPanchayatDetails,
  approveGpDetails
} from "../controllers/gpDetailsController.js";

const router = express.Router();
router.route("/create").post(isAuth, createPanchayatDetails);
router.route("/get").get(getPanchayatDetails);

router.route("/all").get(isAuth, getAllPanchayatDetails);
router.route("/:id").get(getPanchayatDetailsById).put(updatePanchayatDetails);

router.route('/:id/approve').put(approveGpDetails)
export default router;
