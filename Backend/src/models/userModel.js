import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  full_name: { type: String },
  contact_name: { type: String },
  password: { type: String, default: "123456" },
  department: { type: String },
  designation: { type: String },
  mobile: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  DOB: { type: Date },
  Ef_date_from: { type: Date },
  AadharNo: { type: String, unique: true },
  office_contact_no: { type: String },
  hr_profile_id: { type: Number },
  esop_certified: { type: Boolean },
  esop_no: { type: String },
  role_type: { type: String },
  ctsaname: { type: String },
  srlm_state: { type: String },
  count: { type: Number },
  outer_checkbox: { type: Number },
  status: { type: String },
  created_by: { type: String },
  created_at: { type: Date, default: Date.now },
  modified_by: { type: String },
  modified_at: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", userSchema);
