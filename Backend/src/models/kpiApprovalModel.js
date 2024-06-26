import mongoose, { Schema } from "mongoose";

const kpiApprovalSchema = new Schema(
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
    theme_id: {
      type: String,
      required: true,
      ref: "Theme",
    },
    decision: {
      type: String,
      required: true,
      default: "0",
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
    remarks: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      required: true,
      default: "1",
    },
    created_by: {
      type: String,
      required: true,
    },
    modified_by: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "modified_at" },
  }
);

export const KPIApprovalModel = mongoose.model(
  "KPIApproval",
  kpiApprovalSchema
);
