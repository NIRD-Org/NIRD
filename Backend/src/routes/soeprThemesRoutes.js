import express from "express";
import { isAuth } from "../middlewares/auth.js";
import {
  createTheme,
  deleteTheme,
  getAllThemes,
  getThemeById,
  updateTheme,
} from "../controllers/soeprThemesController.js";
const router = express.Router();

router.use("/create", isAuth);

router.route("/all").get(getAllThemes);
router.route("/:id").get(getThemeById);
router.route("/get-theme/:id").get(getThemeById);
router.route("/create").post(createTheme);
router.route("/:id").delete(deleteTheme);
router.route("/:id").put(updateTheme);

export default router;
