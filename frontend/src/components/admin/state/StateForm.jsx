import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import API from "@/utils/API";
import { tst } from "@/lib/utils";
import AdminHeader from "../AdminHeader";
import { useParams } from "react-router-dom";

function StateForm({ type = "add", onSubmit, state }) {
  const [formData, setFormData] = useState({
    name: state?.name || "",
    state_shortcode: state?.state_shortcode || "",
    country_id: state?.country_id || "",
  });
  const { id } = useParams();

  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (type === "update" && id) {
      const fetchState = async () => {
        try {
          const response = await API.get(`/api/v1/state/${id}`);
          const data = response.data.state;
          setFormData({
            name: data.name,
            state_shortcode: data.state_shortcode,
            country_id: data.country_id,
          });
        } catch (error) {
          tst.error("Failed to fetch state data:", error);
        }
      };
      fetchState();
    }
  }, [type, id]);

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
        await API.post("/api/v1/state/create", formData);
        tst.success("State created successfully");
      } else {
        await API.put(`/api/v1/state/${id}`, formData);
        tst.success("State updated successfully");
      }
      if (onSubmit) {
        onSubmit();
      }
    } catch (error) {
      tst.error("Failed to submit form:", error);
    } finally {
      setPending(false);
    }
  };

  const formFields = [
    {
      name: "name",
      label: "Name",
      required: true,
    },
    {
      name: "state_shortcode",
      label: "State Shortcode",
      required: true,
    },
    {
      name: "country_id",
      label: "Country ID",
      required: true,
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <form onSubmit={handleSubmit}>
        <div className="py-4">
          <AdminHeader>
            {type === "add" ? "Add State" : "Update State"}
          </AdminHeader>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
            {formFields.map(field => (
              <div key={field.name}>
                <Label htmlFor={field.name} className="inline-block mb-2">
                  {field.label}
                </Label>
                {field.required && <span className="text-red-500 ml-1">*</span>}
                <Input
                  type="text"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  id={field.name}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  className="col-span-3"
                  required={field.required}
                  disabled={pending}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <Button disabled={pending} pending={pending} type="submit">
            {type === "add" ? "Add State" : "Update State"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default StateForm;
