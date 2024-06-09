import express from "express";
import { createTheme, getAllThemes } from "../controllers/themeController.js";

const router = express.Router();

router.route("/all").get(getAllThemes);
router.route("/create").post(createTheme);

export default router;
