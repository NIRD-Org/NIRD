import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "@/utils/API";
import { Button } from "@/components/ui/button";
import AdminHeader from "../AdminHeader";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { tst } from "@/lib/utils";

const LCVAForm = ({ update = false }) => {
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);
  const [locationData, setLocationData] = useState({
    states: [],
    districts: [],
    blocks: [],
    gps: [],
  });

  const [formData, setFormData] = useState({
    theme_id: "",
    state_id: "",
    dist_id: "",
    block_id: "",
    gp_id: "",
    activityTitle: "",
    image: null,
    document: null,
    video: null,
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
            setFormData(prevData => ({
              ...prevData,
              block_id: "",
              gp_id: "",
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
          if (!update)
            setFormData(prevData => ({
              ...prevData,
              gp_id: "",
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
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = e => {
    const { name, files } = e.target;
    setFormData(prev => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (update) {
        await API.put(`/api/v1/lcva/update/${formData.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        setPending(true);
        await API.post("/api/v1/lcva/create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      tst.success("Data submitted successfully");
    } catch (error) {
      tst.error("Failed to submit form");
      console.log(error);
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    async function fetchThemes() {
      try {
        const response = await API.get("/api/v1/theme/all");
        setLocationData(prevData => ({
          ...prevData,
          themes: response.data.themes || [],
        }));
      } catch (error) {
        console.log(error);
      }
    }
    fetchThemes();
  }, []);

  const formFields = [
    {
      label: "Theme Name",
      name: "theme_id",
      type: "select",
      options: locationData?.themes?.map(theme => ({
        value: theme.id,
        label: theme.theme_name,
      })),
      required: true,
    },
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
      name: "financial_year", 
      label: "Financial Year",
      type: "select",
      options: Array.from({ length: 30 }, (_, i) => {
        const startYear = 2021 + i;
        const endYear = startYear + 1;
        return {
          value: `FY${startYear}-${endYear}`,
          label: `FY${startYear}-${endYear}`,
        };
      }),
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
    {
      label: "Activity Title",
      name: "activityTitle",
      type: "text",
      required: true,
    },
  ];

  if (!locationData.themes) return;

  return (
    <div className="p-2 md:p-6">
      <AdminHeader>
        {update ? "Edit LCVA" : "Add LCVA"}
      </AdminHeader>
      <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {formFields.map((field, index) => (
          <div className="mb-4" key={index}>
            <label className="block font-bold mb-2">{field.label}</label>
            {field.type === "text" ? (
              <Input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                required={field.required}
              />
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
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : null}
          </div>
        ))}
        <div className="mb-4">
          <label className="block font-bold mb-2">
            Upload Photo for Display
          </label>
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleFileChange}
            required={!update}
            className="block"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Upload Document</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            name="document"
            onChange={handleFileChange}
            required={!update}
            className="block"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Upload Video</label>
          <input
            type="file"
            accept="video/*"
            name="video"
            onChange={handleFileChange}
            required={!update}
            className="block"
          />
        </div>
        <div></div>
        <Button pending={pending} type="submit" className="px-20 self-end">
          {update ? "Update" : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default LCVAForm;
