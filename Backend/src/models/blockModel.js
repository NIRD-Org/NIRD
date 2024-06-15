import mongoose, { Schema } from "mongoose";

const blockSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    state_id: {
      type: String,
      required: true,
      ref: "State",
    },
    dist_id: {
      type: String,
      required: true,
      ref: "District",
    },
    lgd_code: {
      type: String,
      required: false,
    },

    name: {
      type: String,
      required: true,
    },
    is_maped_to_another_district: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "1",
    },
    created_by: {
      type: String,
      required: false,
    },
    modified_by: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "modified_at" },
  }
);

export const BlockModel = mongoose.model("Block", blockSchema);
