import mongoose from "mongoose";

const usersLocationSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    userLocations: {
      state_ids: [
        {
          type: String,
          required: true,
        },
      ],
      dist_ids: [
        {
          type: String,
          required: true,
        },
      ],
      block_ids: [
        {
          type: String,
          required: true,
        },
      ],
      gp_ids: [
        {
          type: String,
          required: true,
        },
      ],
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
