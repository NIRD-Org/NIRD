import mongoose, { Schema } from "mongoose";

const kpiQuestionsSchema = new Schema({
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
  kpi_id: {
    type: String,
    required: true,
    ref: "KPI",
  },
  question_name: {
    type: String,
    required: true,
  },
  input_type: {
    type: String,
    required: true,
  },
  max_range: {
    type: Number,
    default: 0,
  },
  question_type: {
    type: String,
    required: true,
  },
  status: {
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

export const KPIQuestionsModel = mongoose.model(
  "KPIQuestion",
  kpiQuestionsSchema
);
