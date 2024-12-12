import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema(
  {
    
    title: {
      type: String,
      required: [true, "Title is required."],
      trim: true,
      minlength: [5, "Title must be at least 5 characters long."],
      maxlength: [100, "Title cannot exceed 100 characters."],
    },
    image: {
      type: String,
      required: [true, "Image is required."],
    },
    content: {
      type: String,
      required: [true, "Content is required."],
      minlength: [2, "Content must be at least 20 characters long."],
    },

    created_by: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "modified_at" },
  }
);

export const BlogPost = mongoose.model("BlogPost", blogPostSchema);


