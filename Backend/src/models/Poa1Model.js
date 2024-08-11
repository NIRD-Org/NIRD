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
      required: true,
    },
    action: {
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
    achievements: {
      type: String,
      default: "",
    },
    photo: {
      type: String, // Store photo file path or URL
      default: "",
    },
    remarks: {
      type: String,
      default: "",
    },
  },
  { _id: false } // Disable _id field for subdocument
);

const POA1Schema = new mongoose.Schema(
  {
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
    poaData: [POA1DaySchema], // Array of day-wise POA1 data
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "modified_at" },
  }
);

export const Poa1Model = mongoose.model("POA1", POA1Schema);
