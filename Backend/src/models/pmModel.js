const pmSchema = new mongoose.Schema(
  {
    state_id: { type: Number, required: true },
    dist_id: { type: Number, required: true },
    block_id: { type: Number, required: true },
    gp_id: { type: Number, required: true },
    pm_state_id: { type: Number, required: true },
    pm_dist_id: { type: Number, required: true },
    pm_block_id: { type: Number, required: true },
    pm_gp_id: { type: Number, required: true },
    date: { type: String, required: true },
    remarks: { type: String, required: true },
    file: { type: String, required: true },
    created_by: { type: String, required: true },
    decision: { type: Number, default: 0 },
    status: { type: String, default: 1 },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "modified_at" } }
);

export const PmModel = mongoose.model("Pm", pmSchema);
