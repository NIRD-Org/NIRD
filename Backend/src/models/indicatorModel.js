import mongoose from "mongoose";

const indicatorSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    max_range: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "1",
      required: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "modified_at" },
  }
);

export const IndicatorModel = mongoose.model("Indicator", indicatorSchema);
