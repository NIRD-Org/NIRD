import mongoose from "mongoose";

const POADaySchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    weekday: {
      type: String,
      required: true,
    },
    plannedEvent: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      required: true,
    },
    achievements: {
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
      enum: ["poa1", "poa2", "poa3", "poa4"],
    },
  },
  { _id: false } // Disable _id field for subdocument
);

const PmupoaSchema = new mongoose.Schema(
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
    poaData: [POADaySchema], // Array of day-wise POA data
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "modified_at" },
  }
);

export const PmupoaModel = mongoose.model("Pmupoa", PmupoaSchema);
