import mongoose from "mongoose";

const pmSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    state_id: { type: String, required: true },
    dist_id: { type: String, required: true },
    block_id: { type: String, required: true },
    gp_id: { type: String, required: true },
    date: { type: String, required: true },
    remarks: { type: String, required: true },
    file: { type: String, required: true },
    created_by: { type: String, required: true },
    decision: { type: Number, default: 0 },
    status: { type: String, default: 1 },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "modified_at" } }
);

const PmModel = mongoose.model("Pm", pmSchema);

export default PmModel;
