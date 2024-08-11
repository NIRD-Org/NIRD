import express from "express";
import { isAuth } from "../middlewares/auth.js";
import { createPoa1, getPoa1Data } from "../controllers/Poa1Controller.js";

const router = express.Router();
router.route("/create").post(isAuth, createPoa1);
router.route("/").get(isAuth, getPoa1Data);

export default router;
