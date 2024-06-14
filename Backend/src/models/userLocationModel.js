import mongoose from "mongoose";

const usersLocationSchema = new mongoose.Schema(
  {
    user_id: {
      type: Number,
      required: true,
    },
    state_id: {
      type: Number,
      required: true,
    },
    dist_id: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      maxlength: 1,
    },
    created_by: {
      type: Number,
      required: true,
    },
    created_at: {
      type: Date,
      required: true,
      default: Date.now,
    },
    modified_by: {
      type: Number,
      required: true,
    },
    modified_at: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "modified_at" },
  }
);

export const UsersLocation = mongoose.model(
  "UsersLocation",
  usersLocationSchema
);
