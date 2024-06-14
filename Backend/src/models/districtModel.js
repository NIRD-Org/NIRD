import mongoose, { Schema } from "mongoose";
const districtSchema = new Schema(
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
    state_id: {
      type: String,
      required: true,
      ref: "State",
    },
    name: {
      type: String,
      required: true,
    },
    special_area: {
      type: String,
      default: "",
    },
    special_area_id: {
      type: String,
      default: "",
    },
    aspirational_district: {
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

export const DistrictModel = mongoose.model("District", districtSchema);
