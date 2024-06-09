import mongoose, { Schema } from "mongoose";

const kpiSchema = new Schema({
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
    required: true,
  },
  weightage: {
    type: Number,
    required: true,
  },
  created_by: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  modified_by: {
    type: String,
    required: true,
  },
  modified_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  flag: {
    type: String,
    default: null,
  },
});

export const KPIModel = mongoose.model("KPI", kpiSchema);
