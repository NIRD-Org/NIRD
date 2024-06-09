import express from "express";
import {
  createTaluk,
  getAllTaluks,
  getTalukById,
  getTaluksByLocation,
} from "../controllers/talukController.js";

const router = express.Router();

router.route("/all").get(getAllTaluks);
router.route("/get-taluk/:id").get(getTalukById);
router.route("/get").get(getTaluksByLocation);
router.route("/create").post(createTaluk);

export default router;
