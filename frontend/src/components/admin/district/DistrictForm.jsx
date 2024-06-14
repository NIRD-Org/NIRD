import React, { useEffect, useState } from "react";
import { DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import API from "@/utils/API";

function DistrictForm({ type, onSubmit, district }) {
  const [formData, setFormData] = useState({
    id: district?.id || "",
    lgd_code: district?.lgd_code || "",
    state_id: district?.state_id || "",
    name: district?.name || "",
    special_area: district?.special_area || "",
  });

  const [states, setStates] = useState([]);
  const [pending, setPending] = useState(false);

  const getAllStates = async () => {
    const { data } = await API.get(`/api/v1/state/all`);
    setStates(data?.states);
  };

  const handleChange = ({ target: { name, value } }) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setPending(true);
    onSubmit(formData);
    setPending(false);
  };

  useEffect(() => {
    getAllStates();
  }, []);

  const fields = [
    { name: "lgd_code", label: "LGD Code" },
    { name: "state_id", label: "State", options: states.map(state => ({ value: state.id, label: state.name })) },
    { name: "name", label: "Name" },
    {
      name: "special_area",
      label: "Special Area",
      options: [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
      ],
    },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>{type === "add" ? "Add District" : "Update District"}</DialogTitle>
        <DialogDescription>{type === "add" ? "Add a new district" : "Update district details"}</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        {fields.map(({ name, label, options }) => (
          <div key={name} className="grid grid-cols-4 gap-4">
            <Label htmlFor={name} className="text-right mt-2">
              {label}
            </Label>
            {options ? (
              <select className="w-full col-span-3 px-4 py-2 rounded-md bg-transparent border" value={formData[name]} name={name} onChange={handleChange}>
                <option value="" disabled>
                  Select a {label}
                </option>
                {options?.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <Input type="text" name={name} value={formData[name]} onChange={handleChange} id={name} placeholder={`Enter ${label}`} className="col-span-3" />
            )}
          </div>
        ))}
      </div>
      <DialogFooter>
        <Button pending={pending} type="submit">
          {type === "add" ? "Add District" : "Update District"}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default DistrictForm;
