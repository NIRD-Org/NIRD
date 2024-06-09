import express from "express";
import { createGP, getGpByLocation } from "../controllers/gpController.js";

const router = express.Router();

router.route("/get").get(getGpByLocation);
router.route("/create").post(createGP);

export default router;
