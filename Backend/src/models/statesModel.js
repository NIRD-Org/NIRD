import mongoose, { Schema } from "mongoose";

const stateSchema = new Schema({
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
  state_shortcode: {
    type: String,
    required: true,
  },
  country_id: {
    type: String,
    required: true,
  },
  state_icon: {
    type: String,
    default: null,
  },
  status: {
    type: Number,
    default: 1,
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
  },
  modified_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export const StateModel = mongoose.model("State", stateSchema);
