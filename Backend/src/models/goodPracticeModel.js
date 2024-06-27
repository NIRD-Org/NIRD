import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define Mongoose schema
const GoodPracticeSchema = new Schema({
  theme_id: {
    type: String,
    required: true,
  },
  state_id: {
    type: String,
    required: true,
  },
  dist_id: {
    type: String,
    required: true,
  },
  block_id: {
    type: String,
    required: true,
  },
  gp_id: {
    type: String,
    required: true,
  },
  activityTitle: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  document:{
    type:String,
    default:""
  },
  video: {
    type: String,
    default: "",
  },
})

const GoodPracticeModel = mongoose.model("GoodPractice", GoodPracticeSchema);
export default GoodPracticeModel
