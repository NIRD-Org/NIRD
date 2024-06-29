import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "@/utils/API";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AdminHeader from "@/components/admin/AdminHeader";
import { Label } from "@/components/ui/label";
import { tst } from "@/lib/utils";

const GpDetailsApprovalResubmit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pending, setPending] = useState(false);
  const [locationData, setLocationData] = useState({
    states: [],
    districts: [],
    blocks: [],
    gps: [],
  });

  const [formData, setFormData] = useState({
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
      sarpanchPhoto: "",
    },
    secretaryDetails: {
      nameOfSecretary: "",
      education: "",
      gender: "",
      numberOfGPCovered: "",
      email: "",
      mobile: "",
      secretaryPhoto: "",
    },
    health: {
      primaryHealthCenters: "",
      healthSubCenters: "",
      wellBeingCenters: "",
      dispensary: "",
      ayurvedicClinics: "",
    },
    education: {
      totalPrimarySchools: "",
      totalPrePrimarySchools: "",
      totalHigherSecondarySchools: "",
      totalSecondarySchools: "",
    },
    sports: {
      noOfVolleyballCourt: "",
      noOfFootballCourt: "",
      noOfBadmintonCourt: "",
    },
    general: {
      noOfSHG: "",
      noOfDestituteHomesOldAgeHomes: "",
      noOfJobCardHolders: "",
      noOfHouseholds: "",
      noOfAnganwadiCenters: "",
    },
    others: {
      noOfHouseholdsConnectedToTapWater: "",
      noOfHouseholdToilets: "",
      noOfDrinkingWaterSources: "",
      noOfSeedCenters: "",
      noOfChildrenParks: "",
      noOfBusStandWithWaterSources: "",
      noOfRuralLibrary: "",
      noOfSolidWasteManagementCenters: "",
      noOfBanks: "",
      noOfATMs: "",
      noOfCommunitySanitaryComplexes: "",
      noOfDisasterRescueCenters: "",
      noOfCommonServiceCenters: "",
    },
    wardDetails: {
      wardName: "",
      memberName: "",
      gender: "",
      casteCategory: "",
      highestQualification: "",
      aproxAge: "",
    },
  });

  useEffect(() => {
    const fetchGpDetails = async () => {
      try {
        const { data } = await API.get(`/api/v1/gp-details/${id}`);
        setFormData(data?.data);
      } catch (error) {
        console.error("Error fetching GP Details:", error);
      }
    };
    fetchGpDetails();
  }, [id]);

  useEffect(() => {
    async function fetchStates() {
      try {
        const response = await API.get("/api/v1/state/all");
        setLocationData(prevData => ({
          ...prevData,
          states: response.data.states || [],
        }));
      } catch (error) {
        console.log(error);
      }
    }

    fetchStates();
  }, []);

  useEffect(() => {
    async function fetchDistricts() {
      if (formData.state_id) {
        try {
          const response = await API.get(
            `/api/v1/dist/state/${formData.state_id}`
          );
          setLocationData(prevData => ({
            ...prevData,
            districts: response.data.districts || [],
          }));
        } catch (error) {
          console.error("Failed to fetch districts.");
        }
      }
    }
    fetchDistricts();
  }, [formData.state_id]);

  useEffect(() => {
    async function fetchBlocks() {
      if (formData.dist_id) {
        try {
          const response = await API.get(
            `/api/v1/block/get?dist=${formData.dist_id}`
          );
          setLocationData(prevData => ({
            ...prevData,
            blocks: response.data.blocks || [],
          }));
        } catch (error) {
          console.error("Failed to fetch blocks.");
        }
      }
    }
    fetchBlocks();
  }, [formData.dist_id]);

  useEffect(() => {
    async function fetchGrams() {
      if (formData.block_id) {
        try {
          const response = await API.get(
            `/api/v1/gram/get?block=${formData.block_id}`
          );
          setLocationData(prevData => ({
            ...prevData,
            gps: response.data.gram || [],
          }));
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchGrams();
  }, [formData.block_id]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    const [parent, child] = name.split(".");
    if (child) {
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = e => {
    const { name, files } = e.target;
    const [parent, child] = name.split(".");
    if (child) {
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: files[0] },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setPending(true);
      await API.put(`/api/v1/gp-details/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      tst.success("Data submitted successfully");
    } catch (error) {
      tst.error("Failed to submit form");
      console.log(error);
    } finally {
      setPending(false);
    }
  };

  const handleNestedInputChange = (e, section) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [section]: {
        ...prevFormData[section],
        [name]: value,
      },
    }));
  };

  const formFields = [
    {
      label: "State",
      name: "state_id",
      type: "select",
      options: locationData?.states?.map(state => ({
        value: state.id,
        label: state.name,
      })),
      required: true,
    },
    {
      label: "District",
      name: "dist_id",
      type: "select",
      options: locationData?.districts?.map(district => ({
        value: district.id,
        label: district.name,
      })),
      required: true,
    },
    {
      label: "Block",
      name: "block_id",
      type: "select",
      options: locationData?.blocks?.map(block => ({
        value: block.id,
        label: block.name,
      })),
      required: true,
    },
    {
      label: "GP",
      name: "gp_id",
      type: "select",
      options: locationData?.gps?.map(gp => ({
        value: gp.id,
        label: gp.name,
      })),
      required: true,
    },
  ];

  const nestedFields = [
    {
      section: "panchayatDetails",
      fields: [
        { label: "State", name: "state", type: "text", required: true },
        { label: "District", name: "district", type: "text", required: true },
        { label: "Block", name: "block", type: "text", required: true },
        { label: "Village", name: "village", type: "text", required: true },
        { label: "Panchayat", name: "panchayat", type: "text", required: true },
        { label: "LGD", name: "lgd", type: "text", required: true },
        { label: "Address", name: "address", type: "text", required: true },
        {
          label: "Mobile Number",
          name: "mobileNumber",
          type: "text",
          required: true,
        },
        { label: "Email Address", name: "emailAddress", type: "text" },
        {
          label: "Distance From Bus Stop",
          name: "distanceFromBusStop",
          type: "number",
          required: true,
        },
        {
          label: "GP Attractions",
          name: "gpAttractions",
          type: "text",
          required: true,
        },
      ],
    },
    {
      section: "demography",
      fields: [
        {
          label: "Total Population",
          name: "totalPopulation",
          type: "number",
          required: true,
        },
        {
          label: "Male Population",
          name: "malePopulation",
          type: "number",
          required: true,
        },
        {
          label: "Female Population",
          name: "femalePopulation",
          type: "number",
          required: true,
        },
        {
          label: "ST Population",
          name: "stPopulation",
          type: "number",
          required: true,
        },
        {
          label: "SC Population",
          name: "scPopulation",
          type: "number",
          required: true,
        },
        {
          label: "OBC Population",
          name: "obcPopulation",
          type: "number",
          required: true,
        },
        {
          label: "General Population",
          name: "generalPopulation",
          type: "number",
          required: true,
        },
        {
          label: "Children Population (0-6)",
          name: "childrenPopulation0to6",
          type: "number",
          required: true,
        },
        {
          label: "Children Population (6-18)",
          name: "childrenPopulation6to18",
          type: "number",
          required: true,
        },
      ],
    },
    {
      section: "panchayatArea",
      fields: [
        {
          label: "Total Area",
          name: "totalArea",
          type: "number",
          required: true,
        },
        {
          label: "Number of Revenue Villages",
          name: "noOfRevenueVillages",
          type: "number",
          required: true,
        },
        {
          label: "Number of Wards/Sansads",
          name: "noOfWardsSansads",
          type: "number",
          required: true,
        },
        {
          label: "Number of Villages Mapped With LGD",
          name: "noOfVillagesMappedWithLGD",
          type: "number",
          required: true,
        },
      ],
    },
    {
      section: "sarpanchDetails",
      fields: [
        {
          label: "Name of Sarpanch",
          name: "nameOfSarpanch",
          type: "text",
          required: true,
        },
        { label: "Education", name: "education", type: "text", required: true },
        { label: "Gender", name: "gender", type: "text", required: true },
        {
          label: "Area of Expertise",
          name: "areaOfExpertise",
          type: "text",
          required: true,
        },
        { label: "Email", name: "email", type: "text" },
        { label: "Mobile", name: "mobile", type: "text", required: true },
        { label: "Sarpanch Photo", name: "sarpanchPhoto", type: "file" },
      ],
    },
    {
      section: "secretaryDetails",
      fields: [
        {
          label: "Name of Secretary",
          name: "nameOfSecretary",
          type: "text",
          required: true,
        },
        { label: "Education", name: "education", type: "text", required: true },
        { label: "Gender", name: "gender", type: "text", required: true },
        {
          label: "Number of GPs Covered",
          name: "numberOfGPCovered",
          type: "number",
          required: true,
        },
        { label: "Email", name: "email", type: "text" },
        { label: "Mobile", name: "mobile", type: "text", required: true },
        { label: "Secretary Photo", name: "secretaryPhoto", type: "file" },
      ],
    },
    {
      section: "health",
      fields: [
        {
          label: "Primary Health Centers",
          name: "primaryHealthCenters",
          type: "number",
        },
        {
          label: "Health Sub Centers",
          name: "healthSubCenters",
          type: "number",
        },
        {
          label: "Well Being Centers",
          name: "wellBeingCenters",
          type: "number",
        },
        { label: "Dispensary", name: "dispensary", type: "number" },
        {
          label: "Ayurvedic Clinics",
          name: "ayurvedicClinics",
          type: "number",
        },
      ],
    },
    {
      section: "education",
      fields: [
        {
          label: "Total Primary Schools",
          name: "totalPrimarySchools",
          type: "number",
        },
        {
          label: "Total Pre-Primary Schools",
          name: "totalPrePrimarySchools",
          type: "number",
        },
        {
          label: "Total Higher Secondary Schools",
          name: "totalHigherSecondarySchools",
          type: "number",
        },
        {
          label: "Total Secondary Schools",
          name: "totalSecondarySchools",
          type: "number",
        },
      ],
    },
    {
      section: "sports",
      fields: [
        {
          label: "Number of Volleyball Courts",
          name: "noOfVolleyballCourt",
          type: "number",
        },
        {
          label: "Number of Football Courts",
          name: "noOfFootballCourt",
          type: "number",
        },
        {
          label: "Number of Badminton Courts",
          name: "noOfBadmintonCourt",
          type: "number",
        },
      ],
    },
    {
      section: "general",
      fields: [
        { label: "Number of SHGs", name: "noOfSHG", type: "number" },
        {
          label: "Number of Destitute Homes/Old Age Homes",
          name: "noOfDestituteHomesOldAgeHomes",
          type: "number",
        },
        {
          label: "Number of Job Card Holders",
          name: "noOfJobCardHolders",
          type: "number",
        },
        {
          label: "Number of Households",
          name: "noOfHouseholds",
          type: "number",
        },
        {
          label: "Number of Anganwadi Centers",
          name: "noOfAnganwadiCenters",
          type: "number",
        },
      ],
    },
    {
      section: "others",
      fields: [
        {
          label: "Number of Households Connected to Tap Water",
          name: "noOfHouseholdsConnectedToTapWater",
          type: "number",
        },
        {
          label: "Number of Household Toilets",
          name: "noOfHouseholdToilets",
          type: "number",
        },
        {
          label: "Number of Drinking Water Sources",
          name: "noOfDrinkingWaterSources",
          type: "number",
        },
        {
          label: "Number of Seed Centers",
          name: "noOfSeedCenters",
          type: "number",
        },
        {
          label: "Number of Children's Parks",
          name: "noOfChildrenParks",
          type: "number",
        },
        {
          label: "Number of Bus Stands with Water Sources",
          name: "noOfBusStandWithWaterSources",
          type: "number",
        },
        {
          label: "Number of Rural Libraries",
          name: "noOfRuralLibrary",
          type: "number",
        },
        {
          label: "Number of Solid Waste Management Centers",
          name: "noOfSolidWasteManagementCenters",
          type: "number",
        },
        { label: "Number of Banks", name: "noOfBanks", type: "number" },
        { label: "Number of ATMs", name: "noOfATMs", type: "number" },
        {
          label: "Number of Community Sanitary Complexes",
          name: "noOfCommunitySanitaryComplexes",
          type: "number",
        },
        {
          label: "Number of Disaster Rescue Centers",
          name: "noOfDisasterRescueCenters",
          type: "number",
        },
        {
          label: "Number of Common Service Centers",
          name: "noOfCommonServiceCenters",
          type: "number",
        },
      ],
    },
    {
      section: "wardDetails",
      fields: [
        { label: "Ward Name", name: "wardName", type: "text", required: true },
        {
          label: "Member Name",
          name: "memberName",
          type: "text",
          required: true,
        },
        { label: "Gender", name: "gender", type: "text", required: true },
        {
          label: "Caste Category",
          name: "casteCategory",
          type: "text",
          required: true,
        },
        {
          label: "Highest Qualification",
          name: "highestQualification",
          type: "text",
          required: true,
        },
        {
          label: "Approx. Age",
          name: "aproxAge",
          type: "number",
          required: true,
        },
      ],
    },
  ];

  return (
    <div className="p-6">
      <AdminHeader>Edit GP Details</AdminHeader>
      <form onSubmit={handleSubmit} className="w-full grid grid-cols-3 gap-10">
        {formFields.map((field, index) => (
          <div className="mb-4" key={index}>
            <label className="block font-bold mb-2">{field.label}</label>
            <select
              name={field.name}
              value={formData[field.name]}
              onChange={handleInputChange}
              className="p-2 border rounded w-full bg-white"
              required={field.required}
            >
              <option value="">Select {field.label}</option>
              {field.options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ))}
        {nestedFields.map((section, sectionIndex) => (
          <div key={sectionIndex} className="col-span-3">
            <h2 className="font-bold mb-4">{section.section}</h2>
            <div className="grid grid-cols-4 gap-10">
              {section.fields.map((field, fieldIndex) => (
                <div className="mb-4" key={fieldIndex}>
                  <Label className="block font-bold mb-2">{field.label}</Label>
                  <Input
                    type={field.type}
                    name={field.name}
                    value={formData[section.section][field.name] || ""}
                    onChange={e => handleNestedInputChange(e, section.section)}
                    required={field.required}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="col-span-3 flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default GpDetailsApprovalResubmit;
