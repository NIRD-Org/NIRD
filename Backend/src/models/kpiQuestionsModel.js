import mongoose, { Schema } from "mongoose";

const kpiQuestionsSchema = new Schema(
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
      required: false,
    },
    max_range: {
      type: String,
      default: 0,
    },
    question_type: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      default:"1"
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

export const KPIQuestionsModel = mongoose.model(
  "KPIQuestion",
  kpiQuestionsSchema
);
