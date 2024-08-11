import express from "express";
import { isAuth } from "../middlewares/auth.js";
import { createPoa1, getPoa1s, getPoalData } from "../controllers/Poa1Controller.js";

const router = express.Router();
router.route("/create").post(isAuth, createPoa1);
router.route("/getUserPOAs").get(isAuth, getPoa1s);
router.route("/get/:id").get(isAuth, getPoalData);

export default router;
