import mongoose from "mongoose";

const usersLocationSchema = new mongoose.Schema(
  {
    id: {
      type: "string",
      required: true,
      unique: true,
    },
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
      default: "1",
      maxlength: 1,
    },
    created_by: {
      type: Number,
    },

    modified_by: {
      type: Number,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "modified_at" },
  }
);

export const UserLocationModel = mongoose.model(
  "UsersLocation",
  usersLocationSchema
);
