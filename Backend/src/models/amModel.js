import mongoose from "mongoose";

const amSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    state_id: { type: String },
    dist_id: { type: String },
    block_id: { type: String },
    gp_id: { type: String },
    date: { type: String, required: true },
    time: {
      type: String,
      required: false,
    },

    weekday: { type: String, required: false },
    amStatus: { type: String, required: false },
    location: { type: String },
    remarks: { type: String, required: false },
    file: { type: String, required: false },
    created_by: { type: Number, required: true }, // Changed to Number
    decision: { type: Number, default: 0 },
    status: { type: Number, default: 1 }, // Changed to Number
  },
  { timestamps: { createdAt: "created_at", updatedAt: "modified_at" } }
);

const AmModel = mongoose.model("Am", amSchema);

export default AmModel;
