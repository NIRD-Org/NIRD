import mongoose from "mongoose";

const trainingSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    programmeCode: { type: String, required: true },
    type: { type: String, required: true },
    onlineOffline: { type: String, required: true },
    title: { type: String, required: true },
    dates: { type: String, required: true },
    duration: { type: String, required: true },
    venue: { type: String, required: true },
    govtOfficials: { type: Number, required: true },
    bankersCommOrgns: { type: Number, required: true },
    zpPRIs: { type: Number, required: true },
    volOrgnsNGOs: { type: Number, required: true },
    natlStateInstts: { type: Number, required: true },
    univColleges: { type: Number, required: true },
    international: { type: Number, required: true },
    others: { type: Number, required: true },
    total: { type: Number, required: true },
    female: { type: Number, required: true },
    trainingMethods: { type: String, required: true },
    totalSessions: { type: Number, required: true },
    totalSessionTime: { type: Number, required: true },
    evaluation: { type: String, required: true },
    trainingPhotos: { type: String, required: true },
    trainingDesign: { type: String, required: true },
    coOrdinate: { type: Number, required: true },
    decision: { type: Number, default: 0 },
    status: { type: String, default: 1 },
    remarks: { type: String, default: "" },
    created_by: { type: String, required: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "modified_at" },
  }
);

const Training = mongoose.model("Training", trainingSchema);

export default Training;
