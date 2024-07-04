import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  employee_id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, default: "123456" },
  role: { type: Number, required: true, enum: [1, 2, 3] },
  department: { type: String },
  designation: { type: String },
  mobile: { type: String },
  email: { type: String, required: true, unique: true },
  efDateFrom: { type: Date },
  dateOfBirth: { type: Date },
  aadharNo: { type: String },
  officeContactNo: { type: String },
  createdBy: { type: String },
  modifiedBy: { type: String },
  location_assigned: { type: Boolean, default: false },

  hr_profile_id: { type: Number },
  esop_certified: { type: Boolean },
  esop_no: { type: String },
  role_type: { type: String },
  ctsaname: { type: String },
  srlm_state: { type: String },
  count: { type: Number },
  outer_checkbox: { type: Number },
  status: { type: String, default: 1 },

  created_at: { type: Date, default: Date.now },
  modified_at: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", userSchema);
