import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { tst } from "@/lib/utils";
import API from "@/utils/API";
import AdminHeader from "../AdminHeader";

function AmUploadForm() {
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
    am_upload_file: null,
    date: "",
    remarks: "",
    status: "",
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
          const response = await API.get(`/api/v1/dist/state/${formData.state_id}`);
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
          const response = await API.get(`/api/v1/block/get?dist=${formData.dist_id}`);
          setLocationData(prevData => ({
            ...prevData,
            blocks: response.data.blocks || [],
          }));
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
          const response = await API.get(`/api/v1/gram/get?block=${formData.block_id}`);
          setLocationData(prevData => ({
            ...prevData,
            gps: response.data.gram || [],
          }));
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

  const handleChange = e => {
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
      setPending(true);
      await API.post("/api/v1/am-upload/create", formData, { headers: { "Content-Type": "multipart/form-data" } });
      tst.success("AM upload successful");
    } catch (error) {
      console.error(error);
      tst.error(error);
    } finally {
      setPending(false);
    }
  };

  const fields = [
    {
      label: "State",
      name: "state_id",
      type: "select",
      options: locationData.states.map(state => ({
        value: state.id,
        label: state.name,
      })),
      required: true,
    },
    {
      label: "District",
      name: "dist_id",
      type: "select",
      options: locationData.districts.map(district => ({
        value: district.id,
        label: district.name,
      })),
      required: true,
    },
    {
      label: "Block",
      name: "block_id",
      type: "select",
      options: locationData.blocks.map(block => ({
        value: block.id,
        label: block.name,
      })),
      required: true,
    },
    {
      label: "GP",
      name: "gp_id",
      type: "select",
      options: locationData.gps.map(gp => ({
        value: gp.id,
        label: gp.name,
      })),
      required: true,
    },

    {
      label: "Date",
      name: "date",
      type: "date",
      required: true,
    },
    {
      label: "Remarks",
      name: "remarks",
      type: "text",
    },
    {
      label: "Status",
      name: "status",
      type: "text",
      required: true,
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <AdminHeader>AM Entry Form</AdminHeader>
      <form onSubmit={handleSubmit}>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {fields.map((field, index) => (
            <div key={index}>
              <Label className="mb-2 inline-block">{field.label}</Label>
              {field.required && <span className="text-red-500 ml-1">*</span>}
              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
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
              ) : (
                <Input
                  type={field.type || "text"}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                />
              )}
            </div>
          ))}
          <div>
            <Label className="mb-2 inline-block">AM Upload File</Label>
            <Input type="file" name="am_upload_file" onChange={handleFileChange} required />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-10 mt-10">
          <Button type="submit" pending={pending}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AmUploadForm;
