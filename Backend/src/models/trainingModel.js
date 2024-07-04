import mongoose from "mongoose";

const trainingSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    programmeCode: { type: String, required: true },
    type: { type: String, required: true }, // Type (Training/Workshop/Seminar/Webinar/Off-Campus/)
    onlineOffline: { type: String, required: true }, // Online/Offline
    title: { type: String, required: true },
    dates: { type: String, required: true },
    duration: { type: String, required: true },
    venue: { type: String, required: true },
    noOfERs: { type: Number, required: true }, // No. of ERs
    noOfGPFunctionaries: { type: Number, required: true }, // No. of GP Functionaries
    noOfMembersOfSHGs: { type: Number, required: true }, // No. of Members of SHGs
    noOfRepsFromVolOrgnsNGOs: { type: Number, required: true }, // No. of Reps. from Vol. Orgns/ NGOs
    noOfRepsFromNatlStateInstns: { type: Number, required: true }, // No. of Reps. from Natl. / State Level Instns.
    noOfPanchayatBandhus: { type: Number, required: true }, // No. of Panchayat Bandhus
    noOfProjectStaffTrained: { type: Number, required: true }, // No. of Project Staff Trained
    others: { type: Number, required: true }, // Others (Youth/PSUs/ Individuals etc.)
    total: { type: Number, required: true },
    noOfFemale: { type: Number, required: true }, // No. of Female
    noOfMale: { type: Number, required: true }, // No. of Male
    trainingMethods: { type: String, required: true },
    totalSessions: { type: Number, required: true },
    totalSessionTime: { type: Number, required: true },
    evalGoogle: { type: Boolean, required: true }, // Evaluation is done on TMP/Google Form ?
    trainingPhotos: { type: String, required: true }, // Upload Training Photos
    trainingDesign: { type: String, required: true }, // Upload Training Design (PDF)
    nameOfTrainingCoordinator: { type: String, required: true }, // Name of the Training Coordinator
    financialYear: { type: String, required: true }, // Financial Year (Drop down menu)
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "modified_at" },
  }
);

const Training = mongoose.model("Training", trainingSchema);

export default Training;
