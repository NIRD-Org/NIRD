import mongoose from "mongoose";

const PanchayatSchema = new mongoose.Schema({
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
  block_id: {
    type: String,
    required: true,
    ref: "Block",
  },
  gp_id: {
    type: String,
    required: true,
    ref: "GramPanchayat",
  },

  panchayatDetails: {
    state: { type: String, required: true },
    district: { type: String, required: true },
    block: { type: String, required: true },
    village: { type: String, required: true },
    panchayat: { type: String, required: true },
    lgd: { type: String, required: true },
    address: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    emailAddress: { type: String, required: false },
    distanceFromBusStop: { type: Number, required: true }, // Distance in KM
    gpAttractions: { type: String, required: true },
  },
  demography: {
    totalPopulation: { type: Number, required: true },
    malePopulation: { type: Number, required: true },
    femalePopulation: { type: Number, required: true },
    stPopulation: { type: Number, required: true },
    scPopulation: { type: Number, required: true },
    obcPopulation: { type: Number, required: true },
    generalPopulation: { type: Number, required: true },
    childrenPopulation0to6: { type: Number, required: true },
    childrenPopulation6to18: { type: Number, required: true },
  },
  panchayatArea: {
    totalArea: { type: Number, required: true }, // in sq. km
    noOfRevenueVillages: { type: Number, required: true },
    noOfWardsSansads: { type: Number, required: true },
    noOfVillagesMappedWithLGD: { type: Number, required: true },
  },
  sarpanchDetails: {
    nameOfSarpanch: { type: String, required: true },
    education: { type: String, required: true },
    gender: { type: String, required: true },
    areaOfExpertise: { type: String, required: true },
    email: { type: String, required: false },
    mobile: { type: String, required: true },
  },
  secretaryDetails: {
    nameOfSecretary: { type: String, required: true },
    education: { type: String, required: true },
    gender: { type: String, required: true },
    numberOfGPCovered: { type: Number, required: true },
    email: { type: String, required: false },
    mobile: { type: String, required: true },
  },
});

export const GpDetailsModel = mongoose.model(
  "PanchayatDetails",
  PanchayatSchema
);
