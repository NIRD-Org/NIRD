import mongoose from "mongoose";

const soeprKpiSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    theme_id: {
      type: String,
      required: true,
      ref: "SoeprTheme",
    },
    name: {
      type: String,
      required: true,
    },
    max_range: {
      type: String,
      default: "",
    },
    input_type: {
      type: String,
      default: "",
    },
    kpi_type: {
      type: String,
      default: "",
    },
    score_rules: {
      type: String,
      default: "",
    },
    kpi_datapoint: {
      type: String,
      required: true,
    },
    remark: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "1",
    },
    weightage: {
      type: Number,
      required: true,
      default: 0,
    },
    created_by: {
      type: String,
    },
    kpi_image: {
      type: String,
      required: false,
      default: "",
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

export const SoeprKpiModel = mongoose.model("SoeprKpi", soeprKpiSchema);
