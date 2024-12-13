import mongoose from "mongoose";

const TrainingMaterialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
    },
    file: {
      type: String,
      required: [true, "File is required."],
    },

    created_by: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "modified_at" },
  }
);

export const TrainingMaterial = mongoose.model("TrainingMaterial", TrainingMaterialSchema);
