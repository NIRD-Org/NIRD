import express from "express";
import {
  getAllAM,
  getAMById,
  createAM,
  deleteAM,
  updateAM,
} from "../controllers/amController.js";
import { isAuth } from "../middlewares/auth.js";

const router = express.Router();

router.route("/all").get(isAuth,getAllAM);
router.route("/create").post(isAuth,createAM);
router.route("/:id").get(getAMById);
router.route("/:id").delete(deleteAM);
router.route("/:id").put(updateAM);

export default router;
