import mongoose from "mongoose";

const POA1DaySchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    weekday: {
      type: String,
      required: true,
    },
    plan: {
      type: String,
      required: false,
    },
    kpi_theme: {
      type: String,
      required: false,
    },
    activity: {
      type: String,
      required: true,
    },
    plannedEvent: {
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
    achievements: {
      type: String,
      default: "",
    },
    photo: {
      type: String,
      default: "",
    },
    remarks: {
      type: String,
      default: "",
    },
    poaType: {
      type: String,
      required: true,
      default: "poa1",
    },
    tentativeTarget: {
      type: String,
      default: "",
    },
  },
  { _id: false } // Disable _id field for subdocument
);

const YfPOA1Schema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    user_id: {
      type: String,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      default: "1",
      required: true,
    },
    poaData: [POA1DaySchema],
    poa2_created_at: {
      type: Date,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "modified_at" },
  }
);

export const YfPoa1Model = mongoose.model("YfPOA1", YfPOA1Schema);
