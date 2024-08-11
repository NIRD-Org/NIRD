import express from "express";
import { isAuth } from "../middlewares/auth.js";
import { createPoa1 } from "../controllers/Poa1Controller.js";

const router = express.Router();
router.route("/create").post(isAuth, createPoa1);

export default router;
