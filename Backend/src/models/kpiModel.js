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
      type: Number,
      default: null,
    },
    Input_Type: {
      type: String,
      default: null,
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
      required: true,
    },
    modified_by: {
      type: String,
    },
    flag: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "modified_at" },
  }
);

export const KPIModel = mongoose.model("KPI", kpiSchema);
