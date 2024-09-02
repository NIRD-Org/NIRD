import mongoose from "mongoose";

const pmSchema = new mongoose.Schema(
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

    pmStatus: { type: String, required: false },
    location: { type: String },
    remarks: { type: String, required: false },
    file: { type: String, required: false },
    created_by: { type: String, required: true },
    decision: { type: Number, default: 0 },
    status: { type: String, default: 1 },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "modified_at" } }
);

const PmModel = mongoose.model("Pm", pmSchema);

export default PmModel;
