import express from "express";
import {
  getAllTaluks,
  getTalukById,
  getTaluksByDistrict,
  getTaluksByState,
} from "../controllers/talukController.js";

const router = express.Router();

router.route("/all").get(getAllTaluks);
router.route("/get-taluk/:id").get(getTalukById);
router.route("/state/:state").get(getTaluksByState);
router.route("/dist/:dist").get(getTaluksByDistrict);

export default router;
