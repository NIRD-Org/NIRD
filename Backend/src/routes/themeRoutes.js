import express from "express";
import {
  createTheme,
  deleteTheme,
  getAllThemes,
  updateTheme,
  getThemeById
} from "../controllers/themeController.js";
import { isAuth } from "../middlewares/auth.js";

const router = express.Router();
router.use('/create',isAuth);
router.route("/all").get(getAllThemes);
router.route("/create").post(createTheme);
router.route("/delete/:id").put(deleteTheme);
router.route("/:id").put(updateTheme);
router.route("/get-theme/:id").get(getThemeById);
export default router;
