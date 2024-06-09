import mongoose from "mongoose";

const gpWiseKpiSchema = new mongoose.Schema({
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
  district_id: {
    type: String,
    required: true,
    ref: "District",
  },
  taluk_id: {
    type: String,
    required: true,
    ref: "Taluk",
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
    default: null,
  },
  remarks: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    required: true,
  },
  submitteed_id: {
    type: String,
    required: true,
  },
  created_by: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
  modified_by: {
    type: String,
    required: true,
  },
  modified_at: {
    type: Date,
    required: true,
  },
});

export const GpWiseKpiModel = mongoose.model("GpWiseKpi", gpWiseKpiSchema);
