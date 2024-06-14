import React, { useState } from "react";
import { DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function StateForm({ type, onSubmit, state }) {
  const [formData, setFormData] = useState({
    lgd_code: state?.lgd_code || "",
    name: state?.name || "",
    state_shortcode: state?.state_shortcode || "",
    country_id: state?.country_id || "",
  });

  const [pending, setPending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPending(true);
    onSubmit(formData);
    setPending(false);
  };

  const formFields = [
    {
      name: "lgd_code",
      label: "LGD Code",
    },
    {
      name: "name",
      label: "Name",
    },
    {
      name: "state_shortcode",
      label: "State Shortcode",
    },
    {
      name: "country_id",
      label: "Country ID",
    },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>{type === "add" ? "Add State" : "Update State"}</DialogTitle>
        <DialogDescription>
          {type === "add" ? "Add a new state" : "Update state details"}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        {formFields.map((field) => (
          <div key={field.name} className="grid grid-cols-4 gap-4">
            <Label htmlFor={field.name} className="text-right mt-2">
              {field.label}
            </Label>
            <Input
              type="text"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              id={field.name}
              placeholder={`Enter ${field.label.toLowerCase()}`}
              className="col-span-3"
            />
          </div>
        ))}
      </div>
      <DialogFooter>
        <Button pending={pending} type="submit">
          {type === "add" ? "Add State" : "Update State"}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default StateForm;

