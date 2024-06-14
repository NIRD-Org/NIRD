import mongoose, { Schema } from "mongoose";

const stateSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    lgd_code: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    state_icon: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      required: true,
    },
    created_by: {
      type: String,
      required: true,
    },
    modified_by: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "modified_at" },
  }
);

export const StateModel = mongoose.model("State", stateSchema);
