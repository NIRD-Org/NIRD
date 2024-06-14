import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  // Login Details
  user_id: { type: Number, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  kp_password: { type: String },
  mspassword: { type: String, default: "20027d8807812a0a483933752ac69085" },
  accessToken: { type: String },
  authKey: { type: String },
  forgot_pass_token: { type: String },
  change_password_firsttime: { type: String },
  count: { type: Number },
  is_first_time: { type: String },
  notification_is_first_time: { type: String },
  login_status: { type: String, enum: ["0", "1"], default: "1", required: true }, // 1- Active, 0 - Inactive
  login_created_by: { type: Number },
  login_created_at: { type: Date },
  login_modified_by: { type: Number },
  login_modified_at: { type: Date, default: Date.now },

  // Users Details
  name: { type: String },
  full_name: { type: String },
  contact_name: { type: String },
  department: { type: String },
  designation: { type: String },
  mobile: { type: String },
  email: { type: String },
  DOB: { type: Date },
  Ef_date_from: { type: Date },
  AadharNo: { type: String },
  office_contact_no: { type: String },
  hr_profile_id: { type: Number },
  esop_certified: { type: String },
  esop_no: { type: String },
  role_type: { type: Number },
  ctsaname: { type: String },
  srlm_state: { type: Number },
  user_count: { type: String },
  outer_checkbox: { type: String },
  user_status: { type: String, enum: ["0", "1", "2", "3"] }, // 1- Active, 0 - Inactive, 2=>Outer Registered, 3=>Rejected
  user_created_by: { type: Number },
  user_created_at: { type: Date },
  user_modified_by: { type: Number },
  user_modified_at: { type: Date, default: Date.now },

  // Users Location Details
  user_location_status: { type: String, required: true },
  user_location_created_by: { type: Number, required: true },
  user_location_created_at: { type: Date, required: true },
  user_location_modified_by: { type: Number, required: true },
  user_location_modified_at: { type: Date, default: Date.now },

  // Login Log Details
  user_ip: { type: String, required: true },
  user_at: { type: Date, default: Date.now },
  user_agent: { type: String, required: true },
  user_platform: { type: String, required: true },
  type_of_operation: { type: String, required: true },
});

// Login Details Schema
const loginDetailsSchema = new Schema({
  user_id: { type: Number, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  kp_password: { type: String },
  mspassword: { type: String, default: "20027d8807812a0a483933752ac69085" },
  accessToken: { type: String },
  authKey: { type: String },
  forgot_pass_token: { type: String },
  change_password_firsttime: { type: String },
  count: { type: Number },
  is_first_time: { type: String },
  notification_is_first_time: { type: String },
  status: { type: String, enum: ["0", "1"], default: "1", required: true }, // 1- Active, 0 - Inactive
  created_by: { type: Number },
  created_at: { type: Date },
  modified_by: { type: Number },
  modified_at: { type: Date, default: Date.now },
});

// Users Schema
const usersSchema = new Schema({
  name: { type: String },
  full_name: { type: String },
  contact_name: { type: String },
  department: { type: String },
  designation: { type: String },
  mobile: { type: String },
  email: { type: String },
  DOB: { type: Date },
  Ef_date_from: { type: Date },
  AadharNo: { type: String },
  office_contact_no: { type: String },
  hr_profile_id: { type: Number },
  esop_certified: { type: String },
  esop_no: { type: String },
  role_type: { type: Number },
  ctsaname: { type: String },
  srlm_state: { type: Number },
  count: { type: String },
  outer_checkbox: { type: String },
  status: { type: String, enum: ["0", "1", "2", "3"], default: 1 },
  created_by: { type: Number },
  created_at: { type: Date },
  modified_by: { type: Number },
  modified_at: { type: Date, default: Date.now },
});

// Users Location Schema
const usersLocationSchema = new Schema({
  user_id: { type: Number, required: true },
  state_id: { type: Number, required: true },
  dist_id: { type: Number, required: true },
  status: { type: String, required: true },
  created_by: { type: Number, required: true },
  created_at: { type: Date, required: true },
  modified_by: { type: Number, required: true },
  modified_at: { type: Date, default: Date.now },
});

// Login Log Schema
const loginLogSchema = new Schema({
  user_id: { type: Number, required: true },
  user_ip: { type: String, required: true },
  user_at: { type: Date, default: Date.now },
  user_agent: { type: String, required: true },
  user_platform: { type: String, required: true },
  type_of_operation: { type: String, required: true },
});

const usersRoleSchema = new Schema({
  user_id: { type: Number, required: true },
  role: { type: Number },
  status: { type: String, enum: ["0", "1"] }, // 1- Active, 0 - Inactive
  created_by: { type: Number },
  created_at: { type: Date },
  modified_by: { type: Number },
  modified_at: { type: Date, default: Date.now },
});

// Mail Tracking Schema
const mailTrackingSchema = new Schema({
  user_id: { type: Number, required: true },
  to_mail: { type: String, required: true },
  from_mail: { type: String },
  subject: { type: String, required: true },
  mail_body: { type: String, required: true },
  cc: { type: String },
  bcc: { type: String },
  create_at: { type: Date, default: Date.now },
  created_by: { type: Number, required: true },
});

// Master State Schema
const masterStateSchema = new Schema({
  lgd_code: { type: Number, required: true },
  name: { type: String, required: true },
  state_shortcode: { type: String },
  country_id: { type: Number, required: true },
  state_icon: { type: String },
  status: { type: String, enum: ["0", "1"], default: "1", required: true }, // 1- Active, 0 - Inactive
  created_by: { type: Number, required: true },
  created_at: { type: Date, required: true },
  modified_by: { type: Number, required: true },
  modified_at: { type: Date, required: true },
});

// Master Taluk Schema
const masterTalukSchema = new Schema({
  state_id: { type: Number },
  dist_id: { type: Number },
  name: { type: String },
  lgd_code: { type: String },
  lgd_code_feb11_2021: { type: Number },
  is_maped_to_another_district: { type: Number }, // 0=>no,1=>yes
  status: { type: String },
  created_by: { type: Number },
  created_at: { type: Date },
  modified_by: { type: Number },
  modified_at: { type: Date },
});

// Master District Schema
const masterDistrictSchema = new Schema({
  lgd_code: { type: Number },
  state_id: { type: Number, required: true },
  name: { type: String },
  special_area: { type: String, enum: ["Yes", "No"] },
  special_area_id: { type: String },
  aspirational_district: { type: String },
  status: { type: Number, required: true, enum: [0, 1], default: 1 },
  created_by: { type: Number, required: true },
  created_at: { type: Date },
  modified_by: { type: Number, required: true },
  modified_at: { type: Date, default: Date.now },
});

// Master GP Schema
const masterGPSchema = new Schema({
  state_id: { type: Number },
  dist_id: { type: Number },
  taluk_id: { type: Number },
  lgd_code: { type: Number },
  name: { type: String },
  lgd_code_feb11_2021: { type: Number },
  is_maped_to_another_distrcit: { type: Number }, // 0=>no,1=>yes
  status: { type: String, enum: [0, 1], default: 1 },
  created_by: { type: Number },
  created_at: { type: Date },
  modified_by: { type: Number },
  modified_at: { type: Date },
});

// Master Designations Schema
const masterDesignationsSchema = new Schema({
  desig_name: { type: String, required: true },
  master_profile_type: { type: String },
  status: { type: Number, default: 1, required: true }, // 1- Active, 0 - Inactive
  created_by: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
  modified_by: { type: Number, required: true },
  modified_at: { type: Date, default: Date.now },
});

// Master Login Type Schema
const masterLoginTypeSchema = new Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ["0", "1"], default: "1", required: true }, // 1- Active, 0 - Inactive
  created_by: { type: Number, required: true },
  created_at: { type: Date, required: true },
  modified_by: { type: Number, required: true },
  modified_at: { type: Date, default: Date.now },
});

// Master KPI YP Schema
const masterKpiYPSchema = new Schema({
  theme_id: { type: Number, required: true },
  kpi_name: { type: String, required: true },
  max_range: { type: Number },
  Input_Type: { type: String },
  status: { type: String },
  weightage: { type: Number, required: true },
  created_by: { type: Number },
  created_at: { type: Date },
  modified_by: { type: Number },
  modified_at: { type: Date, default: Date.now },
  flag: { type: Number },
});

// Master Profile Type Schema
const masterProfileTypeSchema = new Schema({
  login_type: { type: Number, required: true },
  name: { type: String, required: true },
  status: { type: String, enum: ["0", "1"], default: "1", required: true }, // 1- Active, 0 - Inactive
  created_by: { type: Number, required: true },
  created_at: { type: Date, required: true },
  modified_by: { type: Number, required: true },
  modified_at: { type: Date, default: Date.now },
});

// Master Question Weightage Schema
const masterQuestionWeightageSchema = new Schema({
  question_id: { type: Number, required: true },
  from_range: { type: Number },
  to_range: { type: Number, required: true },
  range: { type: String },
  input_type: { type: String },
  status: { type: String },
  weightage: { type: Number, required: true },
  created_by: { type: Number },
  created_at: { type: Date },
  modified_by: { type: Number },
  modified_at: { type: Date, default: Date.now },
  flag: { type: Number },
});

// Master Question YP Schema
const masterQuestionYPSchema = new Schema({
  theme_id: { type: Number, required: true },
  kpi_id: { type: Number, required: true },
  question_name: { type: String },
  input_type: { type: String },
  max_range: { type: String },
  question_type: { type: String, required: true },
  status: { type: String },
  created_by: { type: Number },
  created_at: { type: Date },
  modified_by: { type: Number },
  modified_at: { type: Date, default: Date.now },
  flag: { type: Number },
});

// Master Theme YP Schema
const masterThemeYPSchema = new Schema({
  theme_name: { type: String },
  status: { type: String },
  created_by: { type: Number },
  created_at: { type: Date },
  modified_by: { type: Number },
  modified_at: { type: Date, default: Date.now },
  flag: { type: Number },
});

// Module Creation Schema
const moduleCreationSchema = new Schema({
  name: { type: String, required: true },
  order_no: { type: Number, required: true },
  icon_image: { type: String },
  status: { type: String, required: true }, // 1- Active, 0 - Inactive
  created_by: { type: Number, required: true },
  created_at: { type: Date, required: true },
  modified_by: { type: Number, required: true },
  modified_at: { type: Date, default: Date.now },
});

// Role Assign Schema
const roleAssignSchema = new Schema({
  role_id: { type: Number, required: true },
  module_id: { type: Number, required: true },
  sub_module_id: { type: Number, required: true },
  status: { type: String, required: true },
  created_by: { type: Number, required: true },
  created_at: { type: Date, required: true },
  modified_by: { type: Number, required: true },
  modified_at: { type: Date, default: Date.now },
});

// Role Creation Schema
const roleCreationSchema = new Schema({
  name: { type: String, required: true },
  login_type: { type: Number, required: true },
  login_profile_type: { type: Number, required: true },
  status: { type: String, required: true }, // 1- Active, 0 - Inactive
  created_by: { type: Number, required: true },
  created_at: { type: Date, required: true },
  modified_by: { type: Number, required: true },
  modified_at: { type: Date, default: Date.now },
});

// Sub Module Creation Schema
const subModuleCreationSchema = new Schema({
  module_id: { type: Number, required: true },
  name: { type: String, required: true },
  sub_url: { type: String },
  sub_module_order_no: { type: Number }, //?
  status: { type: String, required: true }, // 1- Active, 0 - Inactive
  created_by: { type: Number, required: true },
  created_at: { type: Date, required: true },
  modified_by: { type: Number, required: true },
  modified_at: { type: Date, default: Date.now },
});

const attendanceSchema = new Schema({
  id: { type: Number, required: true },
  state: { type: Number, required: true },
  district_id: { type: Number, required: true },
  taluk_id: { type: Number, required: true },
  gp_id: { type: Number, required: true },
  pm_state: { type: Number, default: null },
  pm_dist_id: { type: Number, default: null },
  pm_taluk_id: { type: Number, default: null },
  pm_gp_id: { type: Number, default: null },
  date: { type: String, required: true },
  am_upload_file: { type: String },
  pm_created_at: { type: String },
  pm_created_by: { type: Number },
  pm_upload_file: { type: String },
  remarks: { type: String },
  pm_remarks: { type: String },
  status: { type: Number, required: true },
  created_by: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
  modified_by: { type: Number, required: true },
  modified_at: { type: Date, default: Date.now },
});

const GpwiseKpiDataYpApprovalSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  state_id: { type: Number, default: null },
  district_id: { type: Number, default: null },
  taluk_id: { type: Number, default: null },
  gp_id: { type: Number, default: null },
  theme_id: { type: Number, default: null },
  decision: { type: Number, required: true },
  submitteed_id: { type: Number, default: null },
  remarks: { type: String },
  status: { type: Number, required: true },
  created_by: { type: Number, required: true },
  created_at: { type: Date, required: true },
  modified_by: { type: Number, required: true },
  modified_at: { type: Date, default: Date.now },
});

const MasterProfileTypeSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    login_type: { type: Number, required: true },
    name: { type: String, required: true },
    status: { type: String, enum: ["0", "1"], required: true, default: "1" },
    created_by: { type: Number, required: true },
    created_at: { type: Date, required: true },
    modified_by: { type: Number, required: true },
    modified_at: { type: Date, required: true, default: Date.now },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "modified_at" } }
);

// Users Role Schema

// Define models
const MasterState = mongoose.model("MasterState", masterStateSchema);
const MasterTaluk = mongoose.model("MasterTaluk", masterTalukSchema);
const MasterDistrict = mongoose.model("MasterDistrict", masterDistrictSchema);
const MasterGP = mongoose.model("MasterGP", masterGPSchema);
const MasterDesignations = mongoose.model("MasterDesignations", masterDesignationsSchema);
const MasterLoginType = mongoose.model("MasterLoginType", masterLoginTypeSchema);
const RoleAssign = mongoose.model("RoleAssign", roleAssignSchema);
const RoleCreation = mongoose.model("RoleCreation", roleCreationSchema);
const ModuleCreation = mongoose.model("ModuleCreation", moduleCreationSchema);
const SubModuleCreation = mongoose.model("SubModuleCreation", subModuleCreationSchema);

const MasterThemeYP = mongoose.model("MasterThemeYP", masterThemeYPSchema);
const MasterKPIYP = mongoose.model("MasterKPIYP", masterKpiYPSchema);
const MasterProfileType = mongoose.model("MasterProfileType", masterProfileTypeSchema);
const MasterQuestionWeightage = mongoose.model("MasterQuestionWeightage", masterQuestionWeightageSchema);
const MasterQuestionYP = mongoose.model("MasterQuestionYP", masterQuestionYPSchema);
const GpwiseKpiDataYpApproval = mongoose.model("GpwiseKpiDataYpApproval", GpwiseKpiDataYpApprovalSchema);

const Attendance = mongoose.model("Attendance", attendanceSchema);

const Users = mongoose.model("Users", usersSchema);
const UsersLocation = mongoose.model("UsersLocation", usersLocationSchema);
const UsersRole = mongoose.model("UsersRole", usersRoleSchema);
const LoginDetails = mongoose.model("LoginDetails", loginDetailsSchema);
const LoginLog = mongoose.model("LoginLog", loginLogSchema);
const MailTracking = mongoose.model("MailTracking", mailTrackingSchema);

// module.exports = {
//   MasterState,
//   MasterTaluk,
//   MasterThemeYP,
//   ModuleCreation,
//   RoleAssign,
//   RoleCreation,
//   SubModuleCreation,
//   Users,
//   UsersLocation,
//   UsersRole,
//   MasterDistrict,
//   MasterGP,
//   MasterKPIYP,
//   MasterLoginType,
//   MasterProfileType,
//   MasterQuestionWeightage,
//   MasterQuestionYP,
//   LoginDetails,
//   LoginLog,
//   MailTracking,
//   MasterDesignations,
// };
