import mongoose, { Schema } from "mongoose";

const themeSchema = new Schema(
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
    status: {
      type: String,
      default: "1",
      required: true,
    },
    created_by: {
      type: String,
      required: false,
    },
    modified_by: {
      type: String,
      required: false,
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

export const ThemeModel = mongoose.model("Theme", themeSchema);
