import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define Mongoose schema
const LCVASchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    theme_id: {
      type: String,
      required: true,
    },
    state_id: {
      type: String,
      required: true,
    },
    dist_id: {
      type: String,
      required: true,
    },
    block_id: {
      type: String,
      required: true,
    },
    gp_id: {
      type: String,
      required: true,
    },
    activityTitle: {
      type: String,
      required: true,
    },
    images: [],
    document: {
      type: String,
      default: "",
    },
    video: {
      type: String,
      default: "",
    },
    // 0 - not approved , 1 - approved, 2 - sent back for approval
    decision: {
      type: Number,
      enum: [0, 1, 2],
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
    financial_year: {
      type: String,
      required: true,
      default: "",
    },
    created_by: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "modified_at" },
  }
);

LCVASchema.index({ id: 1 });

const LCVAModel = mongoose.model("LCVA", LCVASchema);
export default LCVAModel;
