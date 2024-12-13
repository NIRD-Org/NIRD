import express from "express";
import { isAuth } from "../middlewares/auth.js";
import { createBlogPost, getAllBlogs, getBlogById, getSoeprBlogs } from "../controllers/blogController.js";

const router = express.Router();
router.use("/create", isAuth);
router.route("/create").post(createBlogPost);
router.route("/all").get(getAllBlogs);
router.route("/soepr").get(isAuth, getSoeprBlogs);
router.route("/:id").get(getBlogById);


export default router;
