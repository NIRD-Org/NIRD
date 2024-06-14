import express from "express";
import {
  createTheme,
  deleteTheme,
  getAllThemes,
} from "../controllers/themeController.js";

const router = express.Router();

router.route("/all").get(getAllThemes);
router.route("/create").post(createTheme);
router.route("/delete/:id").put(deleteTheme);

export default router;
