import express from "express";
import { getAllThemes } from "../controllers/themeController.js";

const router = express.Router();

router.route("/all").get(getAllThemes);

export default router;
