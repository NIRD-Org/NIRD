import mongoose, { Schema } from "mongoose";

const soeprStateSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    lgd_code: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    state_icon: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "1",
      required: true,
    },
    created_by: {
      type: String,
    },
    modified_by: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "modified_at" },
  }
);

export const SoeprStateModel = mongoose.model("SoeprState", soeprStateSchema);
