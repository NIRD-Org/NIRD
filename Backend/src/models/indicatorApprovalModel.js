import mongoose, { Schema } from "mongoose";

const indicatorApprovalSchema = new Schema(
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
    decision: {
      type: String,
      required: true,
      default: "0",
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
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "modified_at" },
  }
);

export const IndicatorApprovalModel = mongoose.model(
  "IndicatorApproval",
  indicatorApprovalSchema
);
