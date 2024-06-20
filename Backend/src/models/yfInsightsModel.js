import mongoose from "mongoose";

const yfInsightsSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique:true
    },
    name: {
      type: String,
      required: true,
    },
    dateOfJoining: {
      type: String,
      required: true,
    },
    dateOfSubmission: {
      type: String,
      required: true,
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
    financialYear: {
      type: String,
      required: true,
    },
    achievement: {
      type: String,
      required: true,
    },
    achievementPhoto: {
      type: String,
      required: true,
    },
    failure: {
      type: String,
      required: true,
    },
    planOfAction: {
      type: String,
      required: true,
    },
    approved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "modified_at" },
  }
);

export const YfInsightsModel = mongoose.model("YfInsights", yfInsightsSchema);
