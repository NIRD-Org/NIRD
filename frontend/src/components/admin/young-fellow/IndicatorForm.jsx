import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import API from "@/utils/API";
import { tst } from "@/lib/utils";
import AdminHeader from "../AdminHeader";

function IndicatorForm({ type = "add" }) {
  const [formData, setFormData] = useState({
    state_id: "",
    dist_id: "",
    block_id: "",
    gram_id: "",
    max_range: "",
    input: "",
  });

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [gp, setGp] = useState([]);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    async function fetchStates() {
      try {
        const response = await API.get("/api/v1/state/all");
        setStates(response.data?.states || []);
      } catch (error) {
        tst.error("Failed to fetch states.");
      }
    }

    fetchStates();
  }, []);

  useEffect(() => {
    async function fetchDistricts() {
      if (formData.state_id) {
        try {
          const response = await API.get(`/api/v1/dist/state/${formData.state_id}`);
          setDistricts(response.data?.districts || []);
        } catch (error) {
          tst.error("Failed to fetch districts.");
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
          setBlocks(response.data?.blocks || []);
        } catch (error) {
          tst.error("Failed to fetch blocks.");
        }
      }
    }

    fetchBlocks();
  }, [formData.dist_id]);

  useEffect(() => {
    async function fetchGrams() {
      try {
        const { data } = await API.get(`/api/v1/gram/get?block=${formData.block_id}`);
        setGp(data?.gram || []);
      } catch (error) {
        console.log(error);
      }
    }
    fetchGrams();
  }, [formData.block_id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setPending(true);
    try {
      if (type === "add") {
        await API.post("/api/v1/gp/create", formData);
        tst.success("Gram Panchayat created successfully");
      } else {
        await API.put(`/api/v1/gp/${formData.id}`, formData);
        tst.success("Gram Panchayat updated successfully");
      }
      setPending(false);
    } catch (error) {
      tst.error("Failed to submit form:", error);
      setPending(false);
    }
  };

  const handleCreateGp = async e => {
    e.preventDefault();
    try {
      await API.post("/api/v1/gram/create", formData);
      tst.success("GP created successfully");
    } catch (error) {
      tst.error(error);
    }
  };

  const fields = [
    {
      name: "state_id",
      label: "State",
      type: "select",
      options: states.map(state => ({ value: state.id, label: state.name })),
      required: true,
    },
    {
      name: "dist_id",
      label: "District",
      type: "select",
      options: districts.map(district => ({ value: district.id, label: district.name })),
      required: true,
    },
    {
      name: "block_id",
      label: "Block",
      type: "select",
      options: blocks.map(block => ({ value: block.id, label: block.name })),
      required: true,
    },
    {
      name: "gram_id",
      label: "Gram",
      type: "select",
      options: gp.map(gp => ({ value: gp.id, label: gp.name })),
      required: true,
    },
    { name: "indicator", label: "Indicator", type: "text", disabled :true},
    { name: "max_range", label: "Max_range", type: "text" },
    { name: "input", label: "Input", type: "text", required: true},
    
  ];

  return (
    <div className="container mx-auto p-6">
      <form onSubmit={handleCreateGp}>
        <div className="py-4">
          <AdminHeader>{type === "add" ? "Add Gram Panchayat" : "Update Gram Panchayat"}</AdminHeader>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 md:grid-cols-4">
            {fields.map(({ name, label, type, options, required ,disabled=false}) => (
              <div key={name}>
                <Label htmlFor={name} className="inline-block mb-2">
                  {label}
                </Label>
                {required && <span className="text-red-500 ml-1">*</span>}
                {type === "select" ? (
                  <select required={required} disabled={pending} className="w-full col-span-3 px-4 py-2 rounded-md bg-transparent border" value={formData[name]} name={name} onChange={handleChange}>
                    <option value="" disabled>
                      Select {label}
                    </option>
                    {options.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Input required={required} disabled={pending || disabled} type={type} name={name} value={formData[name]} onChange={handleChange} id={name} placeholder={`Enter ${label}`} className="col-span-3" />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <Button pending={pending} type="submit">
            {type === "add" ? "Add Indicator" : "Update Gram Panchayat"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default IndicatorForm;
