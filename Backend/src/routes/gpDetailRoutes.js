import express from "express";

import { isAuth } from "../middlewares/auth.js";
import {
  createPanchayatDetails,
  getPanchayatDetails,
  getPanchayatDetailsById,
  updatePanchayatDetails,
  getAllPanchayatDetails,
} from "../controllers/gpDetailsController.js";

const router = express.Router();
router.use("/create", isAuth);
router.route("/create").post(createPanchayatDetails);
router.route("/get").get(getPanchayatDetails);

router.route("/all", isAuth).get(getAllPanchayatDetails);
router.route("/:id").get(getPanchayatDetailsById).put(updatePanchayatDetails);
export default router;
