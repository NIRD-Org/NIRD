import express from "express";
import {
  createGP,
  deleteGP,
  getGpByLocation,
  updateGP,
  getGpById,
  getAllGps
} from "../controllers/gpController.js";
import { isAuth } from "../middlewares/auth.js";

const router = express.Router();
router.use("/create", isAuth);
router.route("/get").get(getGpByLocation);
router.route('/get-gram/:id').get(getGpById);
router.route('/all').get(getAllGps);

router.route("/create").post(createGP);
router.route("/:id").delete(deleteGP);
router.route("/:id").put(updateGP);

export default router;
