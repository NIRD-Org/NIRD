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
    poaType: {
      type: String,
      required: true,
      default: "poa1",
    },
  },
  { _id: false } // Disable _id field for subdocument
);

const POA1Schema = new mongoose.Schema(
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
      default: "1", // 1: Active, 0: Inactive, etc.
      required: true,
    },
    poaData: [POA1DaySchema], // Array of day-wise POA1 data
    poa2_created_at: {
      type: Date,
    },
    poa1_approval_status: {
      type: String,
      enum: ['0', '1', '2'], // 0: Pending, 1: Approved, 2: Sent for Modification
      default: '0', // Default status is pending
    },
    poa1_approval_date: {
      type: Date,
      default: null, // Approval timestamp for POA1
    },
    poa1_remarks: {
      type: String,
      default: "", // POA1-specific remarks
    },
    poa2_approval_status: {
      type: String,
      enum: ['0', '1', '2'], // 0: Pending, 1: Approved, 2: Sent for Modification
      default: '0', // Default status is pending
    },
    poa2_approval_date: {
      type: Date,
      default: null, // Approval timestamp for POA2
    },
    poa2_remarks: {
      type: String,
      default: "", // POA2-specific remarks
    },
    approved_by: {
      type: String,
      ref: "User", // Reference to the Senior Consultant who approved the POA
      default: null,
    },
    status_remarks: {
      type: String,
      default: "", // General remarks or suggestions
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "modified_at" },
  }
);

export const Poa1Model = mongoose.model("POA1", POA1Schema);
