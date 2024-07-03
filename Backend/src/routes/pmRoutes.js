import express from "express";
import {
  getAllPM,
  getPMById,
  createPM,
  deletePM,
  updatePM,
} from "../controllers/pmController.js";
import { isAuth } from "../middlewares/auth.js";

const router = express.Router();
router.use("/create", isAuth);

router.route("/all").get(isAuth,getAllPM);
router.route("/create").post(isAuth,createPM);
router.route("/:id").get(getPMById);
router.route("/:id").delete(deletePM);
router.route("/:id").put(updatePM);

export default router;
