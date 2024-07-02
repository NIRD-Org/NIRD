import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import API from "@/utils/API";
import { tst } from "@/lib/utils";
import AdminHeader from "../AdminHeader";
import useStates from "@/components/hooks/location/useState";
import { useParams } from "react-router-dom";

function DistrictForm({ update }) {
  const [formData, setFormData] = useState({});
  const [pending, setPending] = useState(false);
  const { states } = useStates();
  const {id} = useParams();

  useEffect(() => {
    if (update) {
      const fetchDistrictDetails = async () => {
        try {
          const { data } = await API.get(`/api/v1/dist/${id}`);
          setFormData(data?.district || {});
        } catch (error) {
          console.error("Failed to fetch district details.", error);
        }
      };
      fetchDistrictDetails();
    }
  }, [update, district]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateDistrict = async e => {
    e.preventDefault();
    try {
      await API.post("/api/v1/dist/create", formData);
      tst.success("District created successfully");
    } catch (error) {
      tst.error(error);
      console.log(error);
    }
  };

  const handleUpdateDistrict = async e => {
    e.preventDefault();
    try {
      await API.put(`/api/v1/dist/${formData.id}`, formData);
      tst.success("District updated successfully");
    } catch (error) {
      tst.error(error);
      console.log(error);
    }
  };

  const fields = [
    {
      name: "state_id",
      label: "State",
      type: "select",
      options: states.map(state => ({ value: state.id, label: state.name })),
    },
    { name: "name", label: "Name", type: "text" },
    {
      name: "special_area",
      label: "Special Area",
      type: "text",
      options: [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
      ],
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <form onSubmit={update ? handleUpdateDistrict : handleCreateDistrict}>
        <div className="py-4">
          <AdminHeader>{!update ? "Add District" : "Update District"}</AdminHeader>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
            {fields.map(({ name, label, options, type }) => (
              <div key={name}>
                <Label htmlFor={name} className="inline-block mb-2">
                  {label}
                </Label>
                {type === "select" ? (
                  <select
                    className="w-full col-span-3 px-4 py-2 rounded-md bg-transparent border"
                    value={formData[name]}
                    name={name}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select a {label}
                    </option>
                    {options.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Input
                    type={fields.type}
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
            {!update ? "Add District" : "Update District"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default DistrictForm;
