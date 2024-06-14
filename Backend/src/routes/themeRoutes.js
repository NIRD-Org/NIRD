import express from "express";
import {
  createTheme,
  deleteTheme,
  getAllThemes,
  updateTheme,
} from "../controllers/themeController.js";

const router = express.Router();

router.route("/all").get(getAllThemes);
router.route("/create").post(createTheme);
router.route("/delete/:id").put(deleteTheme);
router.route("/:id").put(updateTheme);

export default router;
