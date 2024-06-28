import React, { useEffect, useState } from "react";
import StateFilter from "../filter/StateFilter";
import GramFilter from "../filter/GramFilter";
import BlockFilter from "../filter/BlockFilter";
import DistrictFilter from "../filter/DistrictFilter";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "@/utils/API";
import toast from "react-hot-toast";

const GpDetailsForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const state_id = searchParams.get("state_id") || "";
  const dist_id = searchParams.get("dist_id") || "";
  const block_id = searchParams.get("block_id") || "";
  const gp_id = searchParams.get("gram_id") || "";
  const [formValues, setFormValues] = useState({
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
      sarpanchPhoto: null,
    },
    secretaryDetails: {
      nameOfSecretary: "",
      education: "",
      gender: "",
      numberOfGPCovered: "",
      email: "",
      mobile: "",
      secretaryPhoto: null,
    },
    health: {
      primaryHealthCenters: null,
      healthSubCenters: null,
      wellBeingCenters: null,
      dispensary: null,
      ayurvedicClinics: null,
    },
    education: {
      totalPrimarySchools: null,
      totalPrePrimarySchools: null,
      totalHigherSecondarySchools: null,
      totalSecondarySchools: null,
    },
    sports: {
      noOfVolleyballCourt: null,
      noOfFootballCourt: null,
      noOfBadmintonCourt: null,
    },
    general: {
      noOfSHG: null,
      noOfDestituteHomesOldAgeHomes: null,
      noOfJobCardHolders: null,
      noOfHouseholds: null,
      noOfAnganwadiCenters: null,
    },
    wardDetails: {
      wardName: "",
      memberName: "",
      gender: "",
      casteCategory: "",
      highestQualification: "",
      aproxAge: "",
    },
    others: {
      noOfHouseholdsConnectedToTapWater: null,
      noOfHouseholdToilets: null,
      noOfDrinkingWaterSources: null,
      noOfSeedCenters: null,
      noOfChildrenParks: null,
      noOfBusStandWithWaterSources: null,
      noOfRuralLibrary: null,
      noOfSolidWasteManagementCenters: null,
      noOfBanks: null,
      noOfATMs: null,
      noOfCommunitySanitaryComplexes: null,
      noOfDisasterRescueCenters: null,
      noOfCommonServiceCenters: null,
    },
  });

  const navigate = useNavigate();

  const getStateById = async () => {
    try {
      const { data } = await API.get(`/api/v1/state/${state_id}`);

      setFormValues((prevValues) => ({
        ...prevValues,
        panchayatDetails: {
          ...prevValues.panchayatDetails,
          ["state"]: data?.state.name,
        },
      }));
    } catch (error) {
      console.log(error.message);
    }
  };

  const getDistById = async () => {
    try {
      const { data } = await API.get(`/api/v1/dist/get-dist/${dist_id}`);

      setFormValues((prevValues) => ({
        ...prevValues,
        panchayatDetails: {
          ...prevValues.panchayatDetails,
          ["district"]: data?.district.name,
        },
      }));
    } catch (error) {
      console.log(error.message);
    }
  };

  const getBlockById = async () => {
    try {
      const { data } = await API.get(`/api/v1/block/get-blocks/${block_id}`);

      setFormValues((prevValues) => ({
        ...prevValues,
        panchayatDetails: {
          ...prevValues.panchayatDetails,
          ["block"]: data?.block.name,
        },
      }));
    } catch (error) {
      console.log(error.message);
    }
  };

  const getGpById = async () => {
    try {
      const { data } = await API.get(`/api/v1/gram/get-gram/${gp_id}`);
      setFormValues((prevValues) => ({
        ...prevValues,
        panchayatDetails: {
          ...prevValues.panchayatDetails,
          ["panchayat"]: data?.gp.name,
        },
      }));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (state_id) {
      getStateById();
    }
  }, [state_id]);

  useEffect(() => {
    if (block_id) getBlockById();
  }, [block_id]);

  useEffect(() => {
    if (dist_id) getDistById();
  }, [dist_id]);

  useEffect(() => {
    if (gp_id) getGpById();
  }, [gp_id]);

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

  // const handleSarpanchDetailsChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormValues((prevValues) => ({
  //     ...prevValues,
  //     sarpanchDetails: {
  //       ...prevValues.sarpanchDetails,
  //       [name]: value,
  //     },
  //   }));
  // };

  const handleSarpanchDetailsChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files[0]) {
      console.log(files[0]);
      setFormValues((prevValues) => ({
        ...prevValues,
        sarpanchDetails: {
          ...prevValues.sarpanchDetails,
          [name]: files[0],
        },
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        sarpanchDetails: {
          ...prevValues.sarpanchDetails,
          [name]: value,
        },
      }));
    }
  };

  // const handleSecretaryDetailsChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormValues((prevValues) => ({
  //     ...prevValues,
  //     secretaryDetails: {
  //       ...prevValues.secretaryDetails,
  //       [name]: value,
  //     },
  //   }));
  // };

  const handleSecretaryDetailsChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files[0]) {
      setFormValues((prevValues) => ({
        ...prevValues,
        secretaryDetails: {
          ...prevValues.secretaryDetails,
          [name]: files[0],
        },
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        secretaryDetails: {
          ...prevValues.secretaryDetails,
          [name]: value,
        },
      }));
    }
  };

  const handleHealthChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      health: {
        ...prevValues.health,
        [name]: value,
      },
    }));
  };

  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      education: {
        ...prevValues.education,
        [name]: value,
      },
    }));
  };

  const handleSportsChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      sports: {
        ...prevValues.sports,
        [name]: value,
      },
    }));
  };

  const handleGeneralChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      general: {
        ...prevValues.general,
        [name]: value,
      },
    }));
  };

  const handleWardDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      wardDetails: {
        ...prevValues.wardDetails,
        [name]: value,
      },
    }));
  };

  const handleOthersDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      others: {
        ...prevValues.others,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post(
        "/api/v1/gp-details/create",
        {
          state_id,
          dist_id,
          block_id,
          gp_id,
          panchayatDetails: formValues.panchayatDetails,
          demography: formValues.demography,
          panchayatArea: formValues.panchayatArea,
          sarpanchDetails: formValues.sarpanchDetails,
          secretaryDetails: formValues.secretaryDetails,
          health: formValues.health,
          education: formValues.education,
          sports: formValues.sports,
          general: formValues.general,
          wardDetails: formValues.wardDetails,
          others: formValues.others,
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (data?.success) {
        toast.success(data?.message, { position: "bottom-center" });
        navigate("/admin");
      }
    } catch (error) {
      toast.error(
        error.response.data.message
          ? error.response.data.message
          : error.message,
        { position: "bottom-center" }
      );
    }
  };

  return (
    <div className="w-full md:max-w-5xl mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
      >
        <h1 className="text-4xl md:text-5xl font-semibold text-primary text-center">
          Gram Panchayat Details
        </h1>
        <div className="grid py-10  grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-10 justify-between">
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
              disabled
              value={formValues.panchayatDetails.state}
              required
              onChange={handlePanchayatDetailsChange}
              placeholder="State (Select From Dropdown)"
              className="input-field  placeholder:text-sm disabled:text-gray-700 cursor-not-allowed disabled:bg-gray-100 py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              type="text"
              name="district"
              value={formValues.panchayatDetails.district}
              required
              onChange={handlePanchayatDetailsChange}
              disabled
              placeholder="District (Select From Dropdown)"
              className="input-field  placeholder:text-sm disabled:text-gray-700 cursor-not-allowed disabled:bg-gray-100   py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              type="text"
              name="block"
              value={formValues.panchayatDetails.block}
              required
              onChange={handlePanchayatDetailsChange}
              disabled
              placeholder="Block (Select From Dropdown)"
              className="input-field  placeholder:text-sm disabled:text-gray-700 cursor-not-allowed disabled:bg-gray-100   py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              type="text"
              name="village"
              value={formValues.panchayatDetails.village}
              required
              onChange={handlePanchayatDetailsChange}
              placeholder="Village"
              className="input-field  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              type="text"
              name="panchayat"
              value={formValues.panchayatDetails.panchayat}
              required
              onChange={handlePanchayatDetailsChange}
              disabled
              placeholder="GP (Select From Dropdown)"
              className="input-field  placeholder:text-sm disabled:text-gray-700 cursor-not-allowed disabled:bg-gray-100  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              type="text"
              name="lgd"
              value={formValues.panchayatDetails.lgd}
              required
              onChange={handlePanchayatDetailsChange}
              placeholder="LGD"
              className="input-field  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              type="text"
              name="address"
              value={formValues.panchayatDetails.address}
              required
              onChange={handlePanchayatDetailsChange}
              placeholder="Address"
              className="input-field  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              type="text"
              name="mobileNumber"
              value={formValues.panchayatDetails.mobileNumber}
              required
              onChange={handlePanchayatDetailsChange}
              placeholder="Mobile Number"
              className="input-field  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              type="email"
              name="emailAddress"
              value={formValues.panchayatDetails.emailAddress}
              onChange={handlePanchayatDetailsChange}
              placeholder="Email Address"
              className="input-field  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              type="number"
              name="distanceFromBusStop"
              value={formValues.panchayatDetails.distanceFromBusStop}
              required
              onChange={handlePanchayatDetailsChange}
              placeholder="Distance from Bus Stop (in KM)"
              className="input-field  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              type="text"
              name="gpAttractions"
              value={formValues.panchayatDetails.gpAttractions}
              required
              onChange={handlePanchayatDetailsChange}
              placeholder="GP Attractions"
              className="input-field  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
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
              required
              onChange={handleDemographyChange}
              placeholder="Total Population"
              className="input-field  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              type="number"
              name="malePopulation"
              value={formValues.demography.malePopulation}
              required
              onChange={handleDemographyChange}
              placeholder="Male Population"
              className="input-field  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              type="number"
              name="femalePopulation"
              value={formValues.demography.femalePopulation}
              required
              onChange={handleDemographyChange}
              placeholder="Female Population"
              className="input-field  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              type="number"
              name="stPopulation"
              value={formValues.demography.stPopulation}
              required
              onChange={handleDemographyChange}
              placeholder="ST Population"
              className="input-field  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              type="number"
              name="scPopulation"
              value={formValues.demography.scPopulation}
              required
              onChange={handleDemographyChange}
              placeholder="SC Population"
              className="input-field  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              type="number"
              name="obcPopulation"
              value={formValues.demography.obcPopulation}
              required
              onChange={handleDemographyChange}
              placeholder="OBC Population"
              className="input-field  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              type="number"
              name="generalPopulation"
              value={formValues.demography.generalPopulation}
              required
              onChange={handleDemographyChange}
              placeholder="General Population"
              className="input-field  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              type="number"
              name="childrenPopulation0to6"
              value={formValues.demography.childrenPopulation0to6}
              required
              onChange={handleDemographyChange}
              placeholder="Children (0-6 years) Population"
              className="input-field  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              type="number"
              name="childrenPopulation6to18"
              value={formValues.demography.childrenPopulation6to18}
              required
              onChange={handleDemographyChange}
              placeholder="Children (6-18 years) Population"
              className="input-field  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
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
              required
              onChange={handlePanchayatAreaChange}
              placeholder="Total Area (sq. km)"
              className="input-field  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              type="number"
              name="noOfRevenueVillages"
              value={formValues.panchayatArea.noOfRevenueVillages}
              required
              onChange={handlePanchayatAreaChange}
              placeholder="Number of Revenue Villages"
              className="input-field  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              type="number"
              name="noOfWardsSansads"
              value={formValues.panchayatArea.noOfWardsSansads}
              required
              onChange={handlePanchayatAreaChange}
              placeholder="Number of Wards Sansads"
              className="input-field  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              type="number"
              name="noOfVillagesMappedWithLGD"
              value={formValues.panchayatArea.noOfVillagesMappedWithLGD}
              required
              onChange={handlePanchayatAreaChange}
              placeholder="Number of Villages Mapped with LGD"
              className="input-field  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
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
              required
              onChange={handleSarpanchDetailsChange}
              placeholder="Name of Sarpanch"
              className="input-field  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              type="text"
              name="education"
              value={formValues.sarpanchDetails.education}
              required
              onChange={handleSarpanchDetailsChange}
              placeholder="Education of Sarpanch"
              className="input-field  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />

            <select
              required
              name="gender"
              value={formValues.sarpanchDetails.gender}
              onChange={handleSarpanchDetailsChange}
              className="border rounded-sm p-2"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
            <input
              type="text"
              name="areaOfExpertise"
              value={formValues.sarpanchDetails.areaOfExpertise}
              required
              onChange={handleSarpanchDetailsChange}
              placeholder="Area of Expertise of Sarpanch"
              className="input-field  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <div>
              <input
                type="email"
                name="email"
                value={formValues.sarpanchDetails.email}
                onChange={handleSarpanchDetailsChange}
                placeholder="Email of Sarpanch"
                className="input-field  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
              />
            </div>
            <div>
              <input
                type="text"
                name="mobile"
                value={formValues.sarpanchDetails.mobile}
                required
                onChange={handleSarpanchDetailsChange}
                placeholder="Mobile of Sarpanch"
                className="input-field  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
              />
            </div>
            <div className="mb-1">
              <label className="block font-bold mb-2">
                Upload Sarpanch Photo
              </label>
              <input
                type="file"
                accept="image/*"
                name="sarpanchPhoto"
                onChange={handleSarpanchDetailsChange}
                className="block"
              />
            </div>
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
              required
              onChange={handleSecretaryDetailsChange}
              placeholder="Name of Secretary"
              className="input-field  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              type="text"
              name="education"
              value={formValues.secretaryDetails.education}
              required
              onChange={handleSecretaryDetailsChange}
              placeholder="Education of Secretary"
              className="input-field  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />

            <select
              required
              name="gender"
              value={formValues.secretaryDetails.gender}
              onChange={handleSecretaryDetailsChange}
              className="border rounded-sm p-2"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
            <input
              type="number"
              name="numberOfGPCovered"
              value={formValues.secretaryDetails.numberOfGPCovered}
              required
              onChange={handleSecretaryDetailsChange}
              placeholder="Number of GP Covered by Secretary"
              className="input-field  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <div>
              <input
                type="email"
                name="email"
                value={formValues.secretaryDetails.email}
                onChange={handleSecretaryDetailsChange}
                placeholder="Email of Secretary"
                className="input-field  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
              />
            </div>
            <div>
              <input
                type="text"
                name="mobile"
                value={formValues.secretaryDetails.mobile}
                required
                onChange={handleSecretaryDetailsChange}
                placeholder="Mobile of Secretary"
                className="input-field  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
              />
            </div>
            <div className="mb-1">
              <label className="block font-bold mb-2">
                Upload Secretary Photo
              </label>
              <input
                type="file"
                accept="image/*"
                name="secretaryPhoto"
                placeholder="Secretary Photo"
                onChange={handleSecretaryDetailsChange}
                className="block"
              />
            </div>
          </div>
        </div>

        {/* Health */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-primary mb-4">Health</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-10">
            <input
              type="number"
              required
              name="primaryHealthCenters"
              value={formValues.health.primaryHealthCenters}
              onChange={handleHealthChange}
              placeholder="Primary Health Centers"
              className="input-field py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              required
              type="number"
              name="healthSubCenters"
              value={formValues.health.healthSubCenters}
              onChange={handleHealthChange}
              placeholder="Health Sub Centers"
              className="input-field py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              required
              type="number"
              name="wellBeingCenters"
              value={formValues.health.wellBeingCenters}
              onChange={handleHealthChange}
              placeholder="Well Being Centers"
              className="input-field py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              required
              type="number"
              name="dispensary"
              value={formValues.health.dispensary}
              onChange={handleHealthChange}
              placeholder="Dispensary"
              className="input-field py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              required
              type="number"
              name="ayurvedicClinics"
              value={formValues.health.ayurvedicClinics}
              onChange={handleHealthChange}
              placeholder="Ayurvedic Clinics"
              className="input-field py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
          </div>
        </div>

        {/* Education */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Education
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-10">
            <input
              required
              type="number"
              name="totalPrimarySchools"
              value={formValues.education.totalPrimarySchools}
              onChange={handleEducationChange}
              placeholder="Total Primary Schools"
              className="input-field py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              required
              type="number"
              name="totalPrePrimarySchools"
              value={formValues.education.totalPrePrimarySchools}
              onChange={handleEducationChange}
              placeholder="Total Pre-Primary Schools"
              className="input-field py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              required
              type="number"
              name="totalHigherSecondarySchools"
              value={formValues.education.totalHigherSecondarySchools}
              onChange={handleEducationChange}
              placeholder="Total Higher Secondary Schools"
              className="input-field py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              required
              type="number"
              name="totalSecondarySchools"
              value={formValues.education.totalSecondarySchools}
              onChange={handleEducationChange}
              placeholder="Total Secondary Schools"
              className="input-field py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
          </div>
        </div>

        {/* Sports */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-primary mb-4">Sports</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-10">
            <input
              required
              type="number"
              name="noOfVolleyballCourt"
              value={formValues.sports.noOfVolleyballCourt}
              onChange={handleSportsChange}
              placeholder="No of Volleyball Courts"
              className="input-field py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              required
              type="number"
              name="noOfFootballCourt"
              value={formValues.sports.noOfFootballCourt}
              onChange={handleSportsChange}
              placeholder="No of Football Courts"
              className="input-field py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              required
              type="number"
              name="noOfBadmintonCourt"
              value={formValues.sports.noOfBadmintonCourt}
              onChange={handleSportsChange}
              placeholder="No of Badminton Courts"
              className="input-field py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
          </div>
        </div>

        {/* General */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-primary mb-4">General</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-10">
            <input
              type="number"
              required
              name="noOfSHG"
              value={formValues.general.noOfSHG}
              onChange={handleGeneralChange}
              placeholder="No of SHG"
              className="input-field py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              required
              type="number"
              name="noOfDestituteHomesOldAgeHomes"
              value={formValues.general.noOfDestituteHomesOldAgeHomes}
              onChange={handleGeneralChange}
              placeholder="No of Destitute Homes/Old Age Homes"
              className="input-field py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              required
              type="number"
              name="noOfJobCardHolders"
              value={formValues.general.noOfJobCardHolders}
              onChange={handleGeneralChange}
              placeholder="No of Job Card Holders"
              className="input-field py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              required
              type="number"
              name="noOfHouseholds"
              value={formValues.general.noOfHouseholds}
              onChange={handleGeneralChange}
              placeholder="No of Households"
              className="input-field py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              required
              type="number"
              name="noOfAnganwadiCenters"
              value={formValues.general.noOfAnganwadiCenters}
              onChange={handleGeneralChange}
              placeholder="No of Anganwadi Centers"
              className="input-field py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
          </div>
        </div>

        {/* Ward Details */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Ward Details
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-10">
            <input
              type="text"
              name="wardName"
              required
              value={formValues.wardDetails.wardName}
              onChange={handleWardDetailsChange}
              placeholder="Ward Name"
              className="input-field py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              required
              type="text"
              name="memberName"
              value={formValues.wardDetails.memberName}
              onChange={handleWardDetailsChange}
              placeholder="Member Name"
              className="input-field py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <select
              required
              name="gender"
              value={formValues.wardDetails.gender}
              onChange={handleWardDetailsChange}
              className="border rounded-sm p-2"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>

            <select
              required
              name="casteCategory"
              value={formValues.wardDetails.casteCategory}
              onChange={handleWardDetailsChange}
              className="border rounded-sm p-2"
            >
              <option value="">Select Category</option>
              <option value="General">General</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="OBC">OBC</option>
              <option value="Others">Others</option>
            </select>

            <input
              type="text"
              required
              name="highestQualification"
              value={formValues.wardDetails.highestQualification}
              onChange={handleWardDetailsChange}
              placeholder="Highest Qualification"
              className="input-field py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              type="number"
              name="aproxAge"
              required
              value={formValues.wardDetails.aproxAge}
              onChange={handleWardDetailsChange}
              placeholder="Approx Age"
              className="input-field py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Others Details
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-10">
            <input
              type="number"
              name="noOfHouseholdsConnectedToTapWater"
              value={formValues.others.noOfHouseholdsConnectedToTapWater}
              required
              onChange={handleOthersDetailsChange}
              placeholder="No. of Households Connected to Tap Water"
              className="input-field  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              type="number"
              name="noOfHouseholdToilets"
              value={formValues.others.noOfHouseholdToilets}
              required
              onChange={handleOthersDetailsChange}
              placeholder="No. of Household Toilets"
              className="input-field  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              type="number"
              name="noOfDrinkingWaterSources"
              value={formValues.others.noOfDrinkingWaterSources}
              required
              onChange={handleOthersDetailsChange}
              placeholder="No. of Drinking Water Sources"
              className="input-field  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              type="number"
              name="noOfSeedCenters"
              value={formValues.others.noOfSeedCenters}
              required
              onChange={handleOthersDetailsChange}
              placeholder="No. of Seed Centers"
              className="input-field  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              type="number"
              name="noOfChildrenParks"
              value={formValues.others.noOfChildrenParks}
              required
              onChange={handleOthersDetailsChange}
              placeholder="No. of Children Parks"
              className="input-field  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              type="number"
              name="noOfBusStandWithWaterSources"
              value={formValues.others.noOfBusStandWithWaterSources}
              required
              onChange={handleOthersDetailsChange}
              placeholder="No. of Bus Stands with Water Sources"
              className="input-field  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              type="number"
              name="noOfRuralLibrary"
              value={formValues.others.noOfRuralLibrary}
              required
              onChange={handleOthersDetailsChange}
              placeholder="No. of Rural Libraries"
              className="input-field  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              type="number"
              name="noOfSolidWasteManagementCenters"
              value={formValues.others.noOfSolidWasteManagementCenters}
              required
              onChange={handleOthersDetailsChange}
              placeholder="No. of Solid Waste Management Centers"
              className="input-field  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              type="number"
              name="noOfBanks"
              value={formValues.others.noOfBanks}
              required
              onChange={handleOthersDetailsChange}
              placeholder="No. of Banks"
              className="input-field  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              type="number"
              name="noOfATMs"
              value={formValues.others.noOfATMs}
              required
              onChange={handleOthersDetailsChange}
              placeholder="No. of ATMs"
              className="input-field  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              type="number"
              name="noOfCommunitySanitaryComplexes"
              value={formValues.others.noOfCommunitySanitaryComplexes}
              required
              onChange={handleOthersDetailsChange}
              placeholder="No. of Community Sanitary Complexes"
              className="input-field  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              type="number"
              name="noOfDisasterRescueCenters"
              value={formValues.others.noOfDisasterRescueCenters}
              required
              onChange={handleOthersDetailsChange}
              placeholder="No. of Disaster Rescue Centers"
              className="input-field  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
            />
            <input
              type="number"
              name="noOfCommonServiceCenters"
              value={formValues.others.noOfCommonServiceCenters}
              required
              onChange={handleOthersDetailsChange}
              placeholder="No. of Common Service Centers"
              className="input-field  py-2 px-3 outline-1 border border-gray-200 rounded-sm"
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
