import mongoose from "mongoose";

const soeprKpiDataSchema = new mongoose.Schema(
  {
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
    date: {
      type: Date,
      required: true,
    },
    theme_id: {
      type: String,
      required: true,
      ref: "SoeprTheme",
    },
    status: {
      type: String,
      default: "1",
    },
    frequency: {
      type: String,
      default: "",
    },
    quarter: {
      type: String,
      default: "",
    },
    month: {
      type: String,
      default: "",
    },
    financial_year: {
      type: String,
      required: true,
      default: "",
    },
    created_by: {
      type: String,
      required: true,
    },
    modified_by: {
      type: String,
    },
    status:{
      type:String,
      default:"1"
    },
    formData: {
      input_data: {
        type: Number,
        required: true,
      },
      remarks: {
        type: String,
        required: true,
      },
      max_range: {
        type: Number,
        required: true,
      },
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "modified_at" },
  }
);

export const SoeprKpiDataModel = mongoose.model("SoeprKpiData", soeprKpiDataSchema);
