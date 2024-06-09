import express from "express";
import { getAllStates } from "../controllers/statesController.js";

const router = express.Router();

router.route("/all").get(getAllStates);

export default router;
