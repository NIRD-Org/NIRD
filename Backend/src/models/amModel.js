import mongoose from "mongoose";

const amSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true ,unique:true},
    state_id: { type: Number, required: true },
    dist_id: { type: Number, required: true },
    block_id: { type: Number, required: true },
    gp_id: { type: Number, required: true },
    date: { type: String, required: true },
    remarks: { type: String, required: true },
    file: { type: String, required: true },
    created_by: { type: String, required: true },
    decision: { type: Number, default: 0 },
    status: { type: String, default: 1 },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "modified_at" } }
);

const AmModel = mongoose.model("Am", amSchema);

export default AmModel;
