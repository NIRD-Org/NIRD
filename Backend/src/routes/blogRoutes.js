import express from "express";
import { isAuth } from "../middlewares/auth.js";
import { createBlogPost } from "../controllers/blogController.js";

const router = express.Router();
router.use("/create", isAuth);
router.route("/create").post(createBlogPost);

export default router;
