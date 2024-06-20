import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "@/utils/API";
import { Button } from "@/components/ui/button";
import AdminHeader from "../AdminHeader";
import { dummyData } from "./data";

const YoungFellowInsights = ({ update }) => {
  const { userId } = useParams();
  const navigate = useNavigate();

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
    youngFellowName: "",
    dateOfJoining: "",
    dateOfSubmission: "",
    achievement: "",
    achievementPhoto: null,
    failure: "",
    planOfAction: "",
  });

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

    async function fetchUserInsight() {
      /* try {
        const response = await API.get("/api/v1/young-fellow-insights/" + id);
        setFormData(response.data.youngFellowInsight);
      } catch (error) {
        console.log(error);
      } */
      console.log('first')
      const user = dummyData.find(user => user.id == userId);
      console.log(user);
      setFormData({ ...formData, ...user });
    }
    fetchStates();
    if (update) fetchUserInsight();
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
          setFormData(prevData => ({
            ...prevData,
            dist_id: "",
            block_id: "",
            gp_id: "",
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
          setFormData(prevData => ({ ...prevData, block_id: "", gp_id: "" }));
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
          setFormData(prevData => ({ ...prevData, gp_id: "" }));
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchGrams();
  }, [formData.block_id]);

  useEffect(() => {
    if (update) {
      setFormData({
        state_id: update.state_id,
        dist_id: update.dist_id,
        block_id: update.block_id,
        gp_id: update.gp_id,
        youngFellowName: update.youngFellowName,
        dateOfJoining: update.dateOfJoining,
        dateOfSubmission: update.dateOfSubmission,
        achievement: update.achievement,
        failure: update.failure,
        planOfAction: update.planOfAction,
      });
    }
  }, [update]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1];
      setFormData(prev => ({ ...prev, achievementPhoto: base64String }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (update) {
        await API.put(`/api/v1/young-fellow-insights/${id}`, formData);
      } else {
        await API.post("/api/v1/young-fellow-insights", formData);
      }
      navigate("/admin/fellow-insight");
    } catch (error) {
      console.log(error);
    }
  };

  const formFields = [
    {
      label: "Young Fellow Name",
      name: "youngFellowName",
      type: "text",
      maxLength: null,
      required: true,
    },
    {
      label: "Date of Joining",
      name: "dateOfJoining",
      type: "date",
      maxLength: null,
      required: true,
    },
    {
      label: "Date of Submission",
      name: "dateOfSubmission",
      type: "date",
      maxLength: null,
      required: true,
    },
    {
      label: "State",
      name: "state_id",
      type: "select",
      options: locationData.states,
      required: true,
    },
    {
      label: "District",
      name: "dist_id",
      type: "select",
      options: locationData.districts,
      required: true,
    },
    {
      label: "Block",
      name: "block_id",
      type: "select",
      options: locationData.blocks,
      required: true,
    },
    {
      label: "GP",
      name: "gp_id",
      type: "select",
      options: locationData.gps,
      required: true,
    },
    {
      label: "Achievements",
      name: "achievement",
      type: "textarea",
      maxLength: 300,
      required: true,
    },
    {
      label: "Failures",
      name: "failure",
      type: "textarea",
      maxLength: 200,
      required: true,
    },
    {
      label: "Plan of Action for FY 2024-25",
      name: "planOfAction",
      type: "textarea",
      maxLength: 200,
      required: true,
    },
  ];

  return (
    <div className="p-6">
      <AdminHeader>
        {update ? "Edit Young Fellow Insight" : "Add Young Fellow Insight"}
      </AdminHeader>
      <form onSubmit={handleSubmit} className="w-full grid grid-cols-3 gap-10">
        {formFields.map((field, index) => (
          <div className="mb-4" key={index}>
            <label className="block font-bold mb-2">{field.label}</label>
            {field.type === "text" || field.type === "date" ? (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                className="p-2 border rounded w-full bg-white"
                required={field.required}
              />
            ) : field.type === "textarea" ? (
              <>
                <textarea
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  className="p-2 border rounded w-full bg-white"
                  maxLength={field.maxLength}
                  required={field.required}
                ></textarea>
                <small>Maximum {field.maxLength} words</small>
              </>
            ) : field.type === "select" ? (
              <select
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                className="p-2 border rounded w-full bg-white"
                required={field.required}
              >
                <option value="">Select {field.label}</option>
                {field.options.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            ) : null}
          </div>
        ))}
        <div className="mb-4">
          <label className="block font-bold mb-2">Financial Year</label>
          <select className="p-2 border rounded w-full bg-white" required>
            <option value="FY 2023-24">FY 2023-24</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Achievement Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
          <small>
            Upload a photo that demonstrates your achievements in the last
            financial year with you present in it
          </small>
        </div>
        <div className="col-span-3 text-right">
          <Button type="submit" className="px-20">
            {update ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default YoungFellowInsights;
