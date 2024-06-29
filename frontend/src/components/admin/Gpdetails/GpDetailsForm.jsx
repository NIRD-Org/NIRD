import React, { useEffect, useState } from "react";
import StateFilter from "../filter/StateFilter";
import GramFilter from "../filter/GramFilter";
import BlockFilter from "../filter/BlockFilter";
import DistrictFilter from "../filter/DistrictFilter";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import API from "@/utils/API";
import toast from "react-hot-toast";
import AdminHeader from "../AdminHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const GpDetailsForm = ({ update }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const state_id = searchParams.get("state_id") || "";
  const dist_id = searchParams.get("dist_id") || "";
  const block_id = searchParams.get("block_id") || "";
  const gp_id = searchParams.get("gram_id") || "";
  const { id } = useParams();

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

  const [loading, setLoading] = useState(false);

  const [sarpanchPhoto, setSarpanchPhoto] = useState("");

  const [secretaryPhoto, setSecretaryPhoto] = useState("");

  const navigate = useNavigate();

  const getStateById = async () => {
    try {
      const { data } = await API.get(`/api/v1/state/${state_id}`);

      setFormValues(prevValues => ({
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

      setFormValues(prevValues => ({
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

      setFormValues(prevValues => ({
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
      setFormValues(prevValues => ({
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

  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handlePanchayatDetailsChange = e => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      panchayatDetails: {
        ...prevValues.panchayatDetails,
        [name]: value,
      },
    }));
  };

  const handleDemographyChange = e => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      demography: {
        ...prevValues.demography,
        [name]: value,
      },
    }));
  };

  const handlePanchayatAreaChange = e => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      panchayatArea: {
        ...prevValues.panchayatArea,
        [name]: value,
      },
    }));
  };

  const handleSarpanchDetailsChange = e => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files[0]) {
      setSarpanchPhoto(files[0]);
    } else {
      setFormValues(prevValues => ({
        ...prevValues,
        sarpanchDetails: {
          ...prevValues.sarpanchDetails,
          [name]: value,
        },
      }));
    }
  };

  const handleSecretaryDetailsChange = e => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files[0]) {
      setSecretaryPhoto(files[0]);
    } else {
      setFormValues(prevValues => ({
        ...prevValues,
        secretaryDetails: {
          ...prevValues.secretaryDetails,
          [name]: value,
        },
      }));
    }
  };

  const handleHealthChange = e => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      health: {
        ...prevValues.health,
        [name]: value,
      },
    }));
  };

  const handleEducationChange = e => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      education: {
        ...prevValues.education,
        [name]: value,
      },
    }));
  };

  const handleSportsChange = e => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      sports: {
        ...prevValues.sports,
        [name]: value,
      },
    }));
  };

  const handleGeneralChange = e => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      general: {
        ...prevValues.general,
        [name]: value,
      },
    }));
  };

  const handleWardDetailsChange = e => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      wardDetails: {
        ...prevValues.wardDetails,
        [name]: value,
      },
    }));
  };

  const handleOthersDetailsChange = e => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      others: {
        ...prevValues.others,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
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
          secretaryPhoto,
          sarpanchPhoto,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (data?.success) {
        toast.success(data?.message, { position: "bottom-center" });
        // navigate("/admin");
      }
    } catch (error) {
      toast.error(
        error.response.data.message
          ? error.response.data.message
          : error.message,
        { position: "bottom-center" }
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getPanchayat = async () => {
      try {
        const { data } = await API.get(`/api/v1/gp-details/${id}`);
        // console.log(data?.data);
        setFormValues(prevValues => ({
          ...prevValues,
          ...data?.data,
        }));
      } catch (error) {
        console.log(error.message);
      }
    };
    if (update) getPanchayat();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      setLoading(true);
      const { data } = await API.put(
        `/api/v1/gp-details/${id}`,
        {
          ...formValues,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (data?.success) {
        toast.success(data?.message, { position: "bottom-center" });
      }
    } catch (error) {
      toast.error(
        error.response.data.message
          ? error.response.data.message
          : error.message,
        { position: "bottom-center" }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full  p-4">
      <form
        onSubmit={!update ? handleSubmit : handleUpdate}
        className="  pb-8 mb-4"
      >
        <AdminHeader>Gram Panchayat Details</AdminHeader>
        <div className="grid py-10  grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-10 justify-between">
          <StateFilter />
          <DistrictFilter />
          <BlockFilter />
          <GramFilter />
        </div>
        {/* Section: Panchayat Details */}
        <div className="mb-6">
          <h2 className="text-xl font-medium text-primary mb-4">
            Panchayat Details
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-10">
            <Input
              type="text"
              name="state"
              disabled
              value={formValues.panchayatDetails.state}
              required
              onChange={handlePanchayatDetailsChange}
              placeholder="State (Select From Dropdown)"
            />
            <Input
              type="text"
              name="district"
              value={formValues.panchayatDetails.district}
              required
              onChange={handlePanchayatDetailsChange}
              disabled
              placeholder="District (Select From Dropdown)"
            />
            <Input
              type="text"
              name="block"
              value={formValues.panchayatDetails.block}
              required
              onChange={handlePanchayatDetailsChange}
              disabled
              placeholder="Block (Select From Dropdown)"
            />
            <Input
              type="text"
              name="village"
              value={formValues.panchayatDetails.village}
              required
              onChange={handlePanchayatDetailsChange}
              placeholder="Village"
            />
            <Input
              type="text"
              name="panchayat"
              value={formValues.panchayatDetails.panchayat}
              required
              onChange={handlePanchayatDetailsChange}
              disabled
              placeholder="GP (Select From Dropdown)"
            />
            <Input
              type="text"
              name="lgd"
              value={formValues.panchayatDetails.lgd}
              required
              onChange={handlePanchayatDetailsChange}
              placeholder="LGD"
            />
            <Input
              type="text"
              name="address"
              value={formValues.panchayatDetails.address}
              required
              onChange={handlePanchayatDetailsChange}
              placeholder="Address"
            />
            <Input
              type="text"
              name="mobileNumber"
              value={formValues.panchayatDetails.mobileNumber}
              required
              onChange={handlePanchayatDetailsChange}
              placeholder="Mobile Number"
            />
            <Input
              type="email"
              name="emailAddress"
              value={formValues.panchayatDetails.emailAddress}
              onChange={handlePanchayatDetailsChange}
              placeholder="Email Address"
            />
            <Input
              type="number"
              name="distanceFromBusStop"
              value={formValues.panchayatDetails.distanceFromBusStop}
              required
              onChange={handlePanchayatDetailsChange}
              placeholder="Distance from Bus Stop (in KM)"
            />
            <Input
              type="text"
              name="gpAttractions"
              value={formValues.panchayatDetails.gpAttractions}
              required
              onChange={handlePanchayatDetailsChange}
              placeholder="GP Attractions"
            />
          </div>
        </div>

        {/* Section: Demography */}
        <div className="mb-6">
          <h2 className="text-xl font-medium text-primary mb-4">Demography</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-10">
            <Input
              type="number"
              name="totalPopulation"
              value={formValues.demography.totalPopulation}
              required
              onChange={handleDemographyChange}
              placeholder="Total Population"
            />
            <Input
              type="number"
              name="malePopulation"
              value={formValues.demography.malePopulation}
              required
              onChange={handleDemographyChange}
              placeholder="Male Population"
            />
            <Input
              type="number"
              name="femalePopulation"
              value={formValues.demography.femalePopulation}
              required
              onChange={handleDemographyChange}
              placeholder="Female Population"
            />
            <Input
              type="number"
              name="stPopulation"
              value={formValues.demography.stPopulation}
              required
              onChange={handleDemographyChange}
              placeholder="ST Population"
            />
            <Input
              type="number"
              name="scPopulation"
              value={formValues.demography.scPopulation}
              required
              onChange={handleDemographyChange}
              placeholder="SC Population"
            />
            <Input
              type="number"
              name="obcPopulation"
              value={formValues.demography.obcPopulation}
              required
              onChange={handleDemographyChange}
              placeholder="OBC Population"
            />
            <Input
              type="number"
              name="generalPopulation"
              value={formValues.demography.generalPopulation}
              required
              onChange={handleDemographyChange}
              placeholder="General Population"
            />
            <Input
              type="number"
              name="childrenPopulation0to6"
              value={formValues.demography.childrenPopulation0to6}
              required
              onChange={handleDemographyChange}
              placeholder="Children (0-6 years) Population"
            />
            <Input
              type="number"
              name="childrenPopulation6to18"
              value={formValues.demography.childrenPopulation6to18}
              required
              onChange={handleDemographyChange}
              placeholder="Children (6-18 years) Population"
            />
          </div>
        </div>

        {/* Section: Panchayat Area */}
        <div className="mb-6">
          <h2 className="text-xl font-medium text-primary mb-4">
            Panchayat Area
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-10">
            <Input
              type="number"
              name="totalArea"
              value={formValues.panchayatArea.totalArea}
              required
              onChange={handlePanchayatAreaChange}
              placeholder="Total Area (sq. km)"
            />
            <Input
              type="number"
              name="noOfRevenueVillages"
              value={formValues.panchayatArea.noOfRevenueVillages}
              required
              onChange={handlePanchayatAreaChange}
              placeholder="Number of Revenue Villages"
            />
            <Input
              type="number"
              name="noOfWardsSansads"
              value={formValues.panchayatArea.noOfWardsSansads}
              required
              onChange={handlePanchayatAreaChange}
              placeholder="Number of Wards Sansads"
            />
            <Input
              type="number"
              name="noOfVillagesMappedWithLGD"
              value={formValues.panchayatArea.noOfVillagesMappedWithLGD}
              required
              onChange={handlePanchayatAreaChange}
              placeholder="Number of Villages Mapped with LGD"
            />
          </div>
        </div>

        {/* Section: Sarpanch Details */}
        <div className="mb-6">
          <h2 className="text-xl font-medium text-primary mb-4">
            Sarpanch Details
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-10">
            <Input
              type="text"
              name="nameOfSarpanch"
              value={formValues.sarpanchDetails.nameOfSarpanch}
              required
              onChange={handleSarpanchDetailsChange}
              placeholder="Name of Sarpanch"
            />
            <Input
              type="text"
              name="education"
              value={formValues.sarpanchDetails.education}
              required
              onChange={handleSarpanchDetailsChange}
              placeholder="Education of Sarpanch"
            />

            <select
              required
              name="gender"
              value={formValues.sarpanchDetails.gender}
              onChange={handleSarpanchDetailsChange}
              className="border rounded-sm p-2 bg-white"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
            <Input
              type="text"
              name="areaOfExpertise"
              value={formValues.sarpanchDetails.areaOfExpertise}
              required
              onChange={handleSarpanchDetailsChange}
              placeholder="Area of Expertise of Sarpanch"
            />
            <div>
              <Input
                type="email"
                name="email"
                value={formValues.sarpanchDetails.email}
                onChange={handleSarpanchDetailsChange}
                placeholder="Email of Sarpanch"
              />
            </div>
            <div>
              <Input
                type="text"
                name="mobile"
                value={formValues.sarpanchDetails.mobile}
                required
                onChange={handleSarpanchDetailsChange}
                placeholder="Mobile of Sarpanch"
              />
            </div>
            <div className="mb-1">
              <label className="block font-bold mb-2">
                Upload Sarpanch Photo
              </label>
              <Input
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
          <h2 className="text-xl font-medium text-primary mb-4">
            Secretary Details
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-10">
            <Input
              type="text"
              name="nameOfSecretary"
              value={formValues.secretaryDetails.nameOfSecretary}
              required
              onChange={handleSecretaryDetailsChange}
              placeholder="Name of Secretary"
            />
            <Input
              type="text"
              name="education"
              value={formValues.secretaryDetails.education}
              required
              onChange={handleSecretaryDetailsChange}
              placeholder="Education of Secretary"
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
            <Input
              type="number"
              name="numberOfGPCovered"
              value={formValues.secretaryDetails.numberOfGPCovered}
              required
              onChange={handleSecretaryDetailsChange}
              placeholder="Number of GP Covered by Secretary"
            />
            <div>
              <Input
                type="email"
                name="email"
                value={formValues.secretaryDetails.email}
                onChange={handleSecretaryDetailsChange}
                placeholder="Email of Secretary"
              />
            </div>
            <div>
              <Input
                type="text"
                name="mobile"
                value={formValues.secretaryDetails.mobile}
                required
                onChange={handleSecretaryDetailsChange}
                placeholder="Mobile of Secretary"
              />
            </div>
            <div className="mb-1">
              <label className="block font-bold mb-2">
                Upload Secretary Photo
              </label>
              <Input
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
          <h2 className="text-xl font-medium text-primary mb-4">Health</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-10">
            <Input
              type="number"
              required
              name="primaryHealthCenters"
              value={formValues.health.primaryHealthCenters}
              onChange={handleHealthChange}
              placeholder="Primary Health Centers"
            />
            <Input
              required
              type="number"
              name="healthSubCenters"
              value={formValues.health.healthSubCenters}
              onChange={handleHealthChange}
              placeholder="Health Sub Centers"
            />
            <Input
              required
              type="number"
              name="wellBeingCenters"
              value={formValues.health.wellBeingCenters}
              onChange={handleHealthChange}
              placeholder="Well Being Centers"
            />
            <Input
              required
              type="number"
              name="dispensary"
              value={formValues.health.dispensary}
              onChange={handleHealthChange}
              placeholder="Dispensary"
            />
            <Input
              required
              type="number"
              name="ayurvedicClinics"
              value={formValues.health.ayurvedicClinics}
              onChange={handleHealthChange}
              placeholder="Ayurvedic Clinics"
            />
          </div>
        </div>

        {/* Education */}
        <div className="mb-6">
          <h2 className="text-xl font-medium text-primary mb-4">Education</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-10">
            <Input
              required
              type="number"
              name="totalPrimarySchools"
              value={formValues.education.totalPrimarySchools}
              onChange={handleEducationChange}
              placeholder="Total Primary Schools"
            />
            <Input
              required
              type="number"
              name="totalPrePrimarySchools"
              value={formValues.education.totalPrePrimarySchools}
              onChange={handleEducationChange}
              placeholder="Total Pre-Primary Schools"
            />
            <Input
              required
              type="number"
              name="totalHigherSecondarySchools"
              value={formValues.education.totalHigherSecondarySchools}
              onChange={handleEducationChange}
              placeholder="Total Higher Secondary Schools"
            />
            <Input
              required
              type="number"
              name="totalSecondarySchools"
              value={formValues.education.totalSecondarySchools}
              onChange={handleEducationChange}
              placeholder="Total Secondary Schools"
            />
          </div>
        </div>

        {/* Sports */}
        <div className="mb-6">
          <h2 className="text-xl font-medium text-primary mb-4">Sports</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-10">
            <Input
              required
              type="number"
              name="noOfVolleyballCourt"
              value={formValues.sports.noOfVolleyballCourt}
              onChange={handleSportsChange}
              placeholder="No of Volleyball Courts"
            />
            <Input
              required
              type="number"
              name="noOfFootballCourt"
              value={formValues.sports.noOfFootballCourt}
              onChange={handleSportsChange}
              placeholder="No of Football Courts"
            />
            <Input
              required
              type="number"
              name="noOfBadmintonCourt"
              value={formValues.sports.noOfBadmintonCourt}
              onChange={handleSportsChange}
              placeholder="No of Badminton Courts"
            />
          </div>
        </div>

        {/* General */}
        <div className="mb-6">
          <h2 className="text-xl font-medium text-primary mb-4">General</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-10">
            <Input
              type="number"
              required
              name="noOfSHG"
              value={formValues.general.noOfSHG}
              onChange={handleGeneralChange}
              placeholder="No of SHG"
            />
            <Input
              required
              type="number"
              name="noOfDestituteHomesOldAgeHomes"
              value={formValues.general.noOfDestituteHomesOldAgeHomes}
              onChange={handleGeneralChange}
              placeholder="No of Destitute Homes/Old Age Homes"
            />
            <Input
              required
              type="number"
              name="noOfJobCardHolders"
              value={formValues.general.noOfJobCardHolders}
              onChange={handleGeneralChange}
              placeholder="No of Job Card Holders"
            />
            <Input
              required
              type="number"
              name="noOfHouseholds"
              value={formValues.general.noOfHouseholds}
              onChange={handleGeneralChange}
              placeholder="No of Households"
            />
            <Input
              required
              type="number"
              name="noOfAnganwadiCenters"
              value={formValues.general.noOfAnganwadiCenters}
              onChange={handleGeneralChange}
              placeholder="No of Anganwadi Centers"
            />
          </div>
        </div>

        {/* Ward Details */}
        <div className="mb-6">
          <h2 className="text-xl font-medium text-primary mb-4">
            Ward Details
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-10">
            <Input
              type="text"
              name="wardName"
              required
              value={formValues.wardDetails.wardName}
              onChange={handleWardDetailsChange}
              placeholder="Ward Name"
            />
            <Input
              required
              type="text"
              name="memberName"
              value={formValues.wardDetails.memberName}
              onChange={handleWardDetailsChange}
              placeholder="Member Name"
            />
            <select
              required
              name="gender"
              value={formValues.wardDetails.gender}
              onChange={handleWardDetailsChange}
              className="border rounded-sm p-2 bg-white"
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
              className="border rounded-md p-2 bg-white"
            >
              <option value="">Select Category</option>
              <option value="General">General</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="OBC">OBC</option>
              <option value="Others">Others</option>
            </select>

            <Input
              type="text"
              required
              name="highestQualification"
              value={formValues.wardDetails.highestQualification}
              onChange={handleWardDetailsChange}
              placeholder="Highest Qualification"
            />
            <Input
              type="number"
              name="aproxAge"
              required
              value={formValues.wardDetails.aproxAge}
              onChange={handleWardDetailsChange}
              placeholder="Approx Age"
            />
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-medium text-primary mb-4">
            Others Details
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-10">
            <Input
              type="number"
              name="noOfHouseholdsConnectedToTapWater"
              value={formValues.others.noOfHouseholdsConnectedToTapWater}
              required
              onChange={handleOthersDetailsChange}
              placeholder="No. of Households Connected to Tap Water"
            />
            <Input
              type="number"
              name="noOfHouseholdToilets"
              value={formValues.others.noOfHouseholdToilets}
              required
              onChange={handleOthersDetailsChange}
              placeholder="No. of Household Toilets"
            />
            <Input
              type="number"
              name="noOfDrinkingWaterSources"
              value={formValues.others.noOfDrinkingWaterSources}
              required
              onChange={handleOthersDetailsChange}
              placeholder="No. of Drinking Water Sources"
            />
            <Input
              type="number"
              name="noOfSeedCenters"
              value={formValues.others.noOfSeedCenters}
              required
              onChange={handleOthersDetailsChange}
              placeholder="No. of Seed Centers"
            />
            <Input
              type="number"
              name="noOfChildrenParks"
              value={formValues.others.noOfChildrenParks}
              required
              onChange={handleOthersDetailsChange}
              placeholder="No. of Children Parks"
            />
            <Input
              type="number"
              name="noOfBusStandWithWaterSources"
              value={formValues.others.noOfBusStandWithWaterSources}
              required
              onChange={handleOthersDetailsChange}
              placeholder="No. of Bus Stands with Water Sources"
            />
            <Input
              type="number"
              name="noOfRuralLibrary"
              value={formValues.others.noOfRuralLibrary}
              required
              onChange={handleOthersDetailsChange}
              placeholder="No. of Rural Libraries"
            />
            <Input
              type="number"
              name="noOfSolidWasteManagementCenters"
              value={formValues.others.noOfSolidWasteManagementCenters}
              required
              onChange={handleOthersDetailsChange}
              placeholder="No. of Solid Waste Management Centers"
            />
            <Input
              type="number"
              name="noOfBanks"
              value={formValues.others.noOfBanks}
              required
              onChange={handleOthersDetailsChange}
              placeholder="No. of Banks"
            />
            <Input
              type="number"
              name="noOfATMs"
              value={formValues.others.noOfATMs}
              required
              onChange={handleOthersDetailsChange}
              placeholder="No. of ATMs"
            />
            <Input
              type="number"
              name="noOfCommunitySanitaryComplexes"
              value={formValues.others.noOfCommunitySanitaryComplexes}
              required
              onChange={handleOthersDetailsChange}
              placeholder="No. of Community Sanitary Complexes"
            />
            <Input
              type="number"
              name="noOfDisasterRescueCenters"
              value={formValues.others.noOfDisasterRescueCenters}
              required
              onChange={handleOthersDetailsChange}
              placeholder="No. of Disaster Rescue Centers"
            />
            <Input
              type="number"
              name="noOfCommonServiceCenters"
              value={formValues.others.noOfCommonServiceCenters}
              required
              onChange={handleOthersDetailsChange}
              placeholder="No. of Common Service Centers"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : update ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default GpDetailsForm;
