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
