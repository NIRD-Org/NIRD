import { CatchAsyncError } from "../middlewares/catchAsyncError.js";
import { BlogPost } from "../models/BlogModel.js";
import { Errorhandler } from "../utils/errorHandler.js";
import { uploadFile } from "../utils/uploadFile.js";

// Controller to create a blog post
export const createBlogPost = CatchAsyncError(async (req, res, next) => {
  try {
    const { title, content } = req.body;

    const { image } = req.files;

    if (!title || !content || !req.files) {
      return next(
        next(new Errorhandler("Title, content, and image are required.", 400))
      );
    }

    const imagePath = await uploadFile(image.data);

    const blogPost = await BlogPost.create({
      title,
      image: imagePath,
      content,
      created_by:req.user?.id
    });

    res.status(201).json({
      success: true,
      message: "Blog post created successfully",
      blogPost,
    });
  } catch (error) {
    console.error(error);
    return next(new Errorhandler("Failed to create Blog Post", 500));
  }
});

// Get all blog posts

export const getAllBlogs = CatchAsyncError(async (req, res, next) => {
  try {
    const blogs = await BlogPost.find({});;
    
    if (!blogs || blogs.length == 0) {
      return next(new Errorhandler("No Blog Post Found", 404));
    }
    res.status(201).json({
      success: true,
      message: "Blog post created successfully",
      data: blogs,
    });
  } catch (error) {
    console.error(error);
    return next(new Errorhandler("Failed to get Blog Post", 500));
  }
});


export const getSoeprBlogs = CatchAsyncError(async (req, res, next) => {
  try {
    const blogs = await BlogPost.find({created_by:req.user?.id});

    if (!blogs || blogs.length == 0) {
      return next(new Errorhandler("No Blog Post Found", 404));
    }
    res.status(201).json({
      success: true,
      message: "Blog post created successfully",
      data: blogs,
    });
  } catch (error) {
    console.error(error);
    return next(new Errorhandler("Failed to get Blog Post", 500));
  }
});

// Get all blog post by id

export const getBlogById = CatchAsyncError(async (req, res, next) => {
  try {
    const blog = await BlogPost.findById(req.params.id);

    if (!blog) {
      return next(new Errorhandler("No Blog Post Found", 404));
    }
    res.status(201).json({
      success: true,
      message: "Blog post created successfully",
      data: blog,
    });
  } catch (error) {
    console.error(error);
    return next(new Errorhandler("Failed to get Blog Post", 500));
  }
});