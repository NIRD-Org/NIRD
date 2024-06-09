import mongoose, { Schema } from "mongoose";

const districtSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  lgd_code: {
    type: String,
    required: true,
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
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  modified_by: {
    type: String,
    required: true,
  },
  modified_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export const DistrictModel = mongoose.model("District", districtSchema);
