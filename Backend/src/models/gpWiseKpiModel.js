import mongoose from "mongoose";

const gpWiseKpiSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    state_id: {
      type: String,
      required: true,
      ref: "State",
    },
    dist_id: {
      type: String,
      required: true,
      ref: "District",
    },
    block_id: {
      type: String,
      required: true,
      ref: "Block",
    },
    gp_id: {
      type: String,
      required: true,
      ref: "GramPanchayat",
    },
    date: {
      type: Date,
      required: true,
    },
    theme_id: {
      type: String,
      required: true,
      ref: "Theme",
    },
    kpi_id: {
      type: String,
      required: true,
      ref: "KPI",
    },
    question_id: {
      type: String,
      required: true,
      // ref: "Question",
    },
    max_range: {
      type: Number,
      required: true,
    },
    input_data: {
      type: Number,
      required: true,
    },
    score: {
      type: Number,
      default: 0,
    },
    remarks: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "0",
    },
    submitted_id: {
      type: String,
      required: true,
    },
    created_by: {
      type: String,
      required: true,
    },
    modified_by: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "modified_at" },
  }
);

export const GpWiseKpiModel = mongoose.model("GpWiseKpi", gpWiseKpiSchema);
