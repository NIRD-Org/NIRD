import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import API from "@/utils/API";
import { tst } from "@/lib/utils";
import AdminHeader from "../AdminHeader";

function StateForm({ type = "add", onSubmit, state }) {
  const [formData, setFormData] = useState({
    name: state?.name || "",
    state_shortcode: state?.state_shortcode || "",
    country_id: state?.country_id || "",
  });

  const [pending, setPending] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateState = async e => {
    e.preventDefault();
    try {
      setPending(true);
      await API.post("/api/v1/state/create", formData);
      tst.success("State created success");
    } catch (error) {
      tst.error(error);
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
  ];

  return (
    <div className="container mx-auto p-6">
      <form onSubmit={handleCreateState}>
        <div className="py-4">
          <AdminHeader>{type === "add" ? "Add State" : "Update State"}</AdminHeader>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
            {formFields.map(field => (
              <div key={field.name}>
                <Label htmlFor={field.name} className="inline-block mb-2">
                  {field.label}
                </Label>
                {field.required && <span className="text-red-500 ml-1">*</span>}
                <Input type="text" name={field.name} value={formData[field.name]} onChange={handleChange} id={field.name} placeholder={`Enter ${field.label.toLowerCase()}`} className="col-span-3" />
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
