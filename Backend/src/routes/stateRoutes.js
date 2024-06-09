import express from "express";
import { getAllStates, createState } from "../controllers/statesController.js";

const router = express.Router();

router.route("/all").get(getAllStates);
router.route("/create").post(createState);

export default router;
