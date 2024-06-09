import mongoose, { Schema } from "mongoose";

const kpiApprovalSchema = new Schema({
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
  theme_id: {
    type: String,
    required: true,
    ref: "Theme",
  },
  decision: {
    type: String,
    required: true,
  },
  submitted_id: {
    type: String,
    required: true,
  },
  remarks: {
    type: String,
    default: null,
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
});

export const KPIApprovalModel = mongoose.model(
  "KPIApproval",
  kpiApprovalSchema
);
