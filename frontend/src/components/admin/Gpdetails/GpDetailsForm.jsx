import React, { useState } from "react";
import StateFilter from "../filter/StateFilter";
import GramFilter from "../filter/GramFilter";
import BlockFilter from "../filter/BlockFilter";
import DistrictFilter from "../filter/DistrictFilter";

const GpDetailsForm = () => {
  const [formValues, setFormValues] = useState({
    id: "",
    state_id: "",
    dist_id: "",
    block_id: "",
    gp_id: "",
    panchayatDetails: {
      state: "",
      district: "",
      block: "",
      village: "",
      panchayat: "",
      lgd: "",
      address: "",
      mobileNumber: "",
      emailAddress: "",
      distanceFromBusStop: "",
      gpAttractions: "",
    },
    demography: {
      totalPopulation: "",
      malePopulation: "",
      femalePopulation: "",
      stPopulation: "",
      scPopulation: "",
      obcPopulation: "",
      generalPopulation: "",
      childrenPopulation0to6: "",
      childrenPopulation6to18: "",
    },
    panchayatArea: {
      totalArea: "",
      noOfRevenueVillages: "",
      noOfWardsSansads: "",
      noOfVillagesMappedWithLGD: "",
    },
    sarpanchDetails: {
      nameOfSarpanch: "",
      education: "",
      gender: "",
      areaOfExpertise: "",
      email: "",
      mobile: "",
    },
    secretaryDetails: {
      nameOfSecretary: "",
      education: "",
      gender: "",
      numberOfGPCovered: "",
      email: "",
      mobile: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handlePanchayatDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      panchayatDetails: {
        ...prevValues.panchayatDetails,
        [name]: value,
      },
    }));
  };

  const handleDemographyChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      demography: {
        ...prevValues.demography,
        [name]: value,
      },
    }));
  };

  const handlePanchayatAreaChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      panchayatArea: {
        ...prevValues.panchayatArea,
        [name]: value,
      },
    }));
  };

  const handleSarpanchDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      sarpanchDetails: {
        ...prevValues.sarpanchDetails,
        [name]: value,
      },
    }));
  };

  const handleSecretaryDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      secretaryDetails: {
        ...prevValues.secretaryDetails,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send formValues to backend or validate
    console.log(formValues);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
      >
        <div className="grid py-10  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-between">
          <StateFilter />
          <DistrictFilter />
          <BlockFilter />
          <GramFilter />
        </div>
        {/* Section: Panchayat Details */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Panchayat Details
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-10">
            <input
              type="text"
              name="state"
              value={formValues.panchayatDetails.state}
              onChange={handlePanchayatDetailsChange}
              placeholder="State"
              className="input-field py-2 px-3 outline-1 border border-gray-400 rounded-sm"
            />
            <input
              type="text"
              name="district"
              value={formValues.panchayatDetails.district}
              onChange={handlePanchayatDetailsChange}
              placeholder="District"
              className="input-field py-2 px-3 outline-1 border border-gray-400 rounded-sm"
            />
            <input
              type="text"
              name="block"
              value={formValues.panchayatDetails.block}
              onChange={handlePanchayatDetailsChange}
              placeholder="Block"
              className="input-field py-2 px-3 outline-1 border border-gray-400 rounded-sm"
            />
            <input
              type="text"
              name="village"
              value={formValues.panchayatDetails.village}
              onChange={handlePanchayatDetailsChange}
              placeholder="Village"
              className="input-field py-2 px-3 outline-1 border border-gray-400 rounded-sm"
            />
            <input
              type="text"
              name="panchayat"
              value={formValues.panchayatDetails.panchayat}
              onChange={handlePanchayatDetailsChange}
              placeholder="Panchayat"
              className="input-field py-2 px-3 outline-1 border border-gray-400 rounded-sm"
            />
            <input
              type="text"
              name="lgd"
              value={formValues.panchayatDetails.lgd}
              onChange={handlePanchayatDetailsChange}
              placeholder="LGD"
              className="input-field py-2 px-3 outline-1 border border-gray-400 rounded-sm"
            />
            <input
              type="text"
              name="address"
              value={formValues.panchayatDetails.address}
              onChange={handlePanchayatDetailsChange}
              placeholder="Address"
              className="input-field py-2 px-3 outline-1 border border-gray-400 rounded-sm"
            />
            <input
              type="text"
              name="mobileNumber"
              value={formValues.panchayatDetails.mobileNumber}
              onChange={handlePanchayatDetailsChange}
              placeholder="Mobile Number"
              className="input-field py-2 px-3 outline-1 border border-gray-400 rounded-sm"
            />
            <input
              type="text"
              name="emailAddress"
              value={formValues.panchayatDetails.emailAddress}
              onChange={handlePanchayatDetailsChange}
              placeholder="Email Address"
              className="input-field py-2 px-3 outline-1 border border-gray-400 rounded-sm"
            />
            <input
              type="number"
              name="distanceFromBusStop"
              value={formValues.panchayatDetails.distanceFromBusStop}
              onChange={handlePanchayatDetailsChange}
              placeholder="Distance from Bus Stop (in KM)"
              className="input-field py-2 px-3 outline-1 border border-gray-400 rounded-sm"
            />
            <input
              type="text"
              name="gpAttractions"
              value={formValues.panchayatDetails.gpAttractions}
              onChange={handlePanchayatDetailsChange}
              placeholder="GP Attractions"
              className="input-field py-2 px-3 outline-1 border border-gray-400 rounded-sm"
            />
          </div>
        </div>

        {/* Section: Demography */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Demography
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-10">
            <input
              type="number"
              name="totalPopulation"
              value={formValues.demography.totalPopulation}
              onChange={handleDemographyChange}
              placeholder="Total Population"
              className="input-field py-2 px-3 outline-1 border border-gray-400 rounded-sm"
            />
            <input
              type="number"
              name="malePopulation"
              value={formValues.demography.malePopulation}
              onChange={handleDemographyChange}
              placeholder="Male Population"
              className="input-field py-2 px-3 outline-1 border border-gray-400 rounded-sm"
            />
            <input
              type="number"
              name="femalePopulation"
              value={formValues.demography.femalePopulation}
              onChange={handleDemographyChange}
              placeholder="Female Population"
              className="input-field py-2 px-3 outline-1 border border-gray-400 rounded-sm"
            />
            <input
              type="number"
              name="stPopulation"
              value={formValues.demography.stPopulation}
              onChange={handleDemographyChange}
              placeholder="ST Population"
              className="input-field py-2 px-3 outline-1 border border-gray-400 rounded-sm"
            />
            <input
              type="number"
              name="scPopulation"
              value={formValues.demography.scPopulation}
              onChange={handleDemographyChange}
              placeholder="SC Population"
              className="input-field py-2 px-3 outline-1 border border-gray-400 rounded-sm"
            />
            <input
              type="number"
              name="obcPopulation"
              value={formValues.demography.obcPopulation}
              onChange={handleDemographyChange}
              placeholder="OBC Population"
              className="input-field py-2 px-3 outline-1 border border-gray-400 rounded-sm"
            />
            <input
              type="number"
              name="generalPopulation"
              value={formValues.demography.generalPopulation}
              onChange={handleDemographyChange}
              placeholder="General Population"
              className="input-field py-2 px-3 outline-1 border border-gray-400 rounded-sm"
            />
            <input
              type="number"
              name="childrenPopulation0to6"
              value={formValues.demography.childrenPopulation0to6}
              onChange={handleDemographyChange}
              placeholder="Children (0-6 years) Population"
              className="input-field py-2 px-3 outline-1 border border-gray-400 rounded-sm"
            />
            <input
              type="number"
              name="childrenPopulation6to18"
              value={formValues.demography.childrenPopulation6to18}
              onChange={handleDemographyChange}
              placeholder="Children (6-18 years) Population"
              className="input-field py-2 px-3 outline-1 border border-gray-400 rounded-sm"
            />
          </div>
        </div>

        {/* Section: Panchayat Area */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Panchayat Area
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-10">
            <input
              type="number"
              name="totalArea"
              value={formValues.panchayatArea.totalArea}
              onChange={handlePanchayatAreaChange}
              placeholder="Total Area (sq. km)"
              className="input-field py-2 px-3 outline-1 border border-gray-400 rounded-sm"
            />
            <input
              type="number"
              name="noOfRevenueVillages"
              value={formValues.panchayatArea.noOfRevenueVillages}
              onChange={handlePanchayatAreaChange}
              placeholder="Number of Revenue Villages"
              className="input-field py-2 px-3 outline-1 border border-gray-400 rounded-sm"
            />
            <input
              type="number"
              name="noOfWardsSansads"
              value={formValues.panchayatArea.noOfWardsSansads}
              onChange={handlePanchayatAreaChange}
              placeholder="Number of Wards Sansads"
              className="input-field py-2 px-3 outline-1 border border-gray-400 rounded-sm"
            />
            <input
              type="number"
              name="noOfVillagesMappedWithLGD"
              value={formValues.panchayatArea.noOfVillagesMappedWithLGD}
              onChange={handlePanchayatAreaChange}
              placeholder="Number of Villages Mapped with LGD"
              className="input-field py-2 px-3 outline-1 border border-gray-400 rounded-sm"
            />
          </div>
        </div>

        {/* Section: Sarpanch Details */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Sarpanch Details
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-10">
            <input
              type="text"
              name="nameOfSarpanch"
              value={formValues.sarpanchDetails.nameOfSarpanch}
              onChange={handleSarpanchDetailsChange}
              placeholder="Name of Sarpanch"
              className="input-field py-2 px-3 outline-1 border border-gray-400 rounded-sm"
            />
            <input
              type="text"
              name="education"
              value={formValues.sarpanchDetails.education}
              onChange={handleSarpanchDetailsChange}
              placeholder="Education of Sarpanch"
              className="input-field py-2 px-3 outline-1 border border-gray-400 rounded-sm"
            />
            <input
              type="text"
              name="gender"
              value={formValues.sarpanchDetails.gender}
              onChange={handleSarpanchDetailsChange}
              placeholder="Gender of Sarpanch"
              className="input-field py-2 px-3 outline-1 border border-gray-400 rounded-sm"
            />
            <input
              type="text"
              name="areaOfExpertise"
              value={formValues.sarpanchDetails.areaOfExpertise}
              onChange={handleSarpanchDetailsChange}
              placeholder="Area of Expertise of Sarpanch"
              className="input-field py-2 px-3 outline-1 border border-gray-400 rounded-sm"
            />
            <input
              type="text"
              name="email"
              value={formValues.sarpanchDetails.email}
              onChange={handleSarpanchDetailsChange}
              placeholder="Email of Sarpanch"
              className="input-field py-2 px-3 outline-1 border border-gray-400 rounded-sm"
            />
            <input
              type="text"
              name="mobile"
              value={formValues.sarpanchDetails.mobile}
              onChange={handleSarpanchDetailsChange}
              placeholder="Mobile of Sarpanch"
              className="input-field py-2 px-3 outline-1 border border-gray-400 rounded-sm"
            />
          </div>
        </div>

        {/* Section: Secretary Details */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Secretary Details
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-10">
            <input
              type="text"
              name="nameOfSecretary"
              value={formValues.secretaryDetails.nameOfSecretary}
              onChange={handleSecretaryDetailsChange}
              placeholder="Name of Secretary"
              className="input-field py-2 px-3 outline-1 border border-gray-400 rounded-sm"
            />
            <input
              type="text"
              name="education"
              value={formValues.secretaryDetails.education}
              onChange={handleSecretaryDetailsChange}
              placeholder="Education of Secretary"
              className="input-field py-2 px-3 outline-1 border border-gray-400 rounded-sm"
            />
            <input
              type="text"
              name="gender"
              value={formValues.secretaryDetails.gender}
              onChange={handleSecretaryDetailsChange}
              placeholder="Gender of Secretary"
              className="input-field py-2 px-3 outline-1 border border-gray-400 rounded-sm"
            />
            <input
              type="number"
              name="numberOfGPCovered"
              value={formValues.secretaryDetails.numberOfGPCovered}
              onChange={handleSecretaryDetailsChange}
              placeholder="Number of GP Covered by Secretary"
              className="input-field py-2 px-3 outline-1 border border-gray-400 rounded-sm"
            />
            <input
              type="text"
              name="email"
              value={formValues.secretaryDetails.email}
              onChange={handleSecretaryDetailsChange}
              placeholder="Email of Secretary"
              className="input-field py-2 px-3 outline-1 border border-gray-400 rounded-sm"
            />
            <input
              type="text"
              name="mobile"
              value={formValues.secretaryDetails.mobile}
              onChange={handleSecretaryDetailsChange}
              placeholder="Mobile of Secretary"
              className="input-field py-2 px-3 outline-1 border border-gray-400 rounded-sm"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="bg-primary hover:bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default GpDetailsForm;
