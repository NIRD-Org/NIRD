import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "@/utils/API";
import { Button } from "@/components/ui/button";
import AdminHeader from "../AdminHeader";
import { dummyData } from "./data";
import { tst } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const YoungFellowInsights = ({ update = false }) => {
  const { id } = useParams();
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
    name: "",
    dateOfJoining: "",
    dateOfSubmission: "",
    achievement: "",
    achievementPhoto: null,
    failure: "",
    planOfAction: "",
    financialYear: "FY 2023-24",
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

    fetchStates();
  }, []);

  useEffect(() => {
    async function fetchUserInsight() {
      try {
        const response = await API.get(`/api/v1/yf-insights/get/${id}`);
        setFormData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    if (update) fetchUserInsight();
  }, [id]);

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
          if (!update)
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
          if (!update)
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
          if (!update) setFormData(prevData => ({ ...prevData, gp_id: "" }));
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchGrams();
  }, [formData.block_id]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, achievementPhoto: file }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (update) {
        await API.put(`/api/v1/yf-insights/update/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        tst.success("Data approved successfully");
      } else {
        await API.post("/api/v1/yf-insights/create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        tst.success("Data submitted and sent for approval successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formFields = [
    {
      label: "Young Fellow Name",
      name: "name",
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
      label: "Financial Year",
      name: "planOfAction",
      type: "nothing",
      maxLength: 200,
      required: true,
    },
    /*  {
      label: "Date of Submission",
      name: "dateOfSubmission",
      type: "date",
      maxLength: null,
      required: true,
    }, */
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
              <Input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                required={field.required}
              />
            ) : field.type === "textarea" ? (
              <>
                <Textarea
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  maxLength={field.maxLength}
                  required={field.required}
                ></Textarea>
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
            ) : field.type === "nothing" ? (
              <div className="mb-4">
                <select
                  className="p-2 border rounded w-full bg-white"
                  required={!update}
                >
                  <option value="FY 2023-24">FY 2023-24</option>
                </select>
              </div>
            ) : null}
          </div>
        ))}

        {!update ? (
          <div className="mb-4">
            <label className="block font-bold mb-2">Achievement Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required={!update}
              className="block"
            />
            <small>
              Upload a photo that demonstrates your achievements in the last
              financial year with you present in it
            </small>
          </div>
        ) : (
          <div>
            <label className="block font-bold mb-2">Achievement Photo</label>
            <img
              className=" rounded-md "
              src={formData.achievementPhoto}
              alt=""
            />
          </div>
        )}
        <div></div>
          <div>
            <label className="block font-bold mb-2 ">Date of Submission</label>
            <Input
              type="date"
              name={"dateOfSubmission"}
              value={formData["dateOfSubmission"]}
              onChange={handleInputChange}
              required
            />
          </div>
          <div></div>
          <div></div>
          <Button type="submit" className="px-20 self-end ">
            {update ? "Approve" : "Submit"}
          </Button>
      </form>
    </div>
  );
};

export default YoungFellowInsights;
