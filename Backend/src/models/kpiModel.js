import mongoose, { Schema } from "mongoose";

const kpiSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    theme_id: {
      type: String,
      required: true,
      ref: "Theme",
    },
    kpi_name: {
      type: String,
      required: true,
    },
    max_range: {
      type: String,
      default: "",
    },
    input_Type: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default:"1",
    },
    weightage: {
      type: Number,
      required: true,
    },
    created_by: {
      type: String,
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

export const KPIModel = mongoose.model("KPI", kpiSchema);
