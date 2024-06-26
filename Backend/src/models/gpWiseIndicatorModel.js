import mongoose from "mongoose";

const gpWiseIndicatorSchema = new mongoose.Schema(
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
    indicator_id: {
      type: String,
      required: true,
      ref: "KPI",
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

    financial_year: {
      type: String,
      required: true,
      default: "",
    },
    status: {
      type: String,
      default: "1",
    },
    submitted_id: {
      type: String,
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
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "modified_at" },
  }
);

export const GpWiseIndicatorModel = mongoose.model(
  "GpWiseIndicator",
  gpWiseIndicatorSchema
);
