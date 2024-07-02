import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import API from "@/utils/API";
import { tst } from "@/lib/utils";
import AdminHeader from "../AdminHeader";
import useStates from "@/components/hooks/location/useState";
import useDistrict from "@/components/hooks/location/useDistrict";

function BlockForm({ update }) {
  const [formData, setFormData] = useState({});
  const [pending, setPending] = useState(false);
  const { states } = useStates();
  const { districts } = useDistrict({ state_id: formData.stateId });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateBlock = async e => {
    e.preventDefault();
    try {
      await API.post("/api/v1/block/create", formData);
      tst.success("block created successfully");
    } catch (error) {
      tst.error(error);
      console.log(error);
    }
  };

  const handleUpdateBlock = async e => {
    e.preventDefault();
    try {
      await API.put(`/api/v1/block/${formData.id}`, formData);
      tst.success("Block updated successfully");
    } catch (error) {
      tst.error("Failed to update block.", error);
    }
  };

  const fields = [
    {
      name: "state_id",
      label: "State",
      type: "select",
      options: states.map(state => ({ value: state.id, label: state.name })),
      required: "true",
    },
    {
      name: "dist_id",
      label: "District",
      type: "select",
      options: districts.map(district => ({ value: district.id, label: district.name })),
      required: "true",
    },
    { name: "name", label: "Name", type: "text", required: true },
    {
      name: "is_maped_to_another_district",
      label: "Mapped to Another District",
      type: "select",
      options: [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
      ],
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <form onSubmit={update? handleCreateBlock : handleUpdateBlock}>
        <div className="py-4">
          <AdminHeader>{update? "Add Block" : "Update Block"}</AdminHeader>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
            {fields.map(({ name, label, type, options, required }) => (
              <div key={name}>
                <Label htmlFor={name} className="inline-block mb-2">
                  {label}
                </Label>
                {required && <span className="text-red-500 ml-1">*</span>}
                {type === "select" ? (
                  <select
                    required={required}
                    disabled={pending}
                    className="w-full col-span-3 px-4 py-2 rounded-md bg-transparent border"
                    value={formData[name]}
                    name={name}
                    onChange={handleChange}
                  >
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
                  <Input
                    required={required}
                    disabled={pending}
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    id={name}
                    placeholder={`Enter ${label}`}
                    className="col-span-3"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <Button pending={pending} type="submit">
            {update? "Add Block" : "Update Block"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default BlockForm;
