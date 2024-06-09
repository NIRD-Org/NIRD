import mongoose, { Schema } from "mongoose";

const talukSchema = new Schema({
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
    required: true,
  },
  lgd_code_feb11_2021: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    required: true,
  },
  is_maped_to_another_district: {
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

export const TalukModel = mongoose.model("Taluk", talukSchema);
