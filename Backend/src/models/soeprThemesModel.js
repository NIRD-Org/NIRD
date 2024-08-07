import mongoose, { Schema } from "mongoose";

const soeprThemeSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    theme_name: {
      type: String,
      required: true,
    },
    theme_image: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "1",
      required: true,
    },
    created_by: {
      type: String,
      required: true,
    },
    modified_by: {
      type: String,
    },
    flag: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "modified_at" },
  }
);

export const SoeprThemeModel = mongoose.model("SoeprTheme", soeprThemeSchema);
