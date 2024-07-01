const pmSchema = new mongoose.Schema(
  {
    state_id: { type: Number, required: true },
    dist_id: { type: Number, required: true },
    block_id: { type: Number, required: true },
    gp_id: { type: Number, required: true },
    pm_state: { type: Number, default: null },
    pm_dist_id: { type: Number, default: null },
    pm_block_id: { type: Number, default: null },
    pm_gp_id: { type: Number, default: null },
    date: { type: String, required: true },
    pm_remarks: { type: String },
    status: { type: String, default: 1 },
    pm_upload_file: { type: String },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "modified_at" } }
);

export const PmModel = mongoose.model("Pm", pmSchema)