import mongoose from "mongoose";

const soeprKpiDataSchema = new mongoose.Schema(
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
    date: {
      type: Date,
      required: true,
    },
    theme_id: {
      type: String,
      required: true,
      ref: "SoeprTheme",
    },
    kpi_id: {
      type: String,
      required: true,
      ref: "SoeprKpi",
    },
    max_range: {
      type: Number,
      default: 0,
      // required: true,
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
      default: "1",
    },
    frequency: {
      type: String,
      default: "",
    },
    quarter: {
      type: String,
      default: "",
    },
    month: {
      type: String,
      default: "",
    },
    financial_year: {
      type: String,
      required: true,
      default: "",
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

export const SoeprKpiDataModel = mongoose.model(
  "SoeprKpiData",
  soeprKpiDataSchema
);
