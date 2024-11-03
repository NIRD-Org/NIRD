import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import API from "@/utils/API";
import { tst } from "@/lib/utils";
import AdminHeader from "../../AdminHeader";
import { useParams } from "react-router-dom";
import { showAlert } from "@/utils/showAlert";

function DistrictForm({ type = "add", onSubmit, district }) {
  const [formData, setFormData] = useState({
    id: district?.id || "",
    state_id: district?.state_id || "",
    name: district?.name || "",
    special_area: district?.special_area || "",
  });
  const [states, setStates] = useState([]);
  const [pending, setPending] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function fetchStates() {
      try {
        const response = await API.get("/api/v1/state/all");
        setStates(response.data?.states || []);
      } catch (error) {
        tst.error("Failed to fetch states.");
      }
    }

    const fetchDistData = async () => {
      try {
        const response = await API.get(`/api/v1/dist/${id}`);
        const data = response.data.district;
        setFormData({
          id: data.id,
          state_id: data.state_id,
          name: data.name,
          special_area: data.special_area,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchStates();
    if (type == "update") fetchDistData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateDistrict = async (e) => {
    e.preventDefault();
    try {
      if (type == "add") {
        await API.post("/api/v1/dist/create", formData);
        showAlert("District created successfully", "success");
      } else {
        await API.put(`/api/v1/dist/${id}`, formData);
        showAlert("District updated successfully", "success");
      }
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
      options: states.map((state) => ({ value: state.id, label: state.name })),
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
      <form onSubmit={handleCreateDistrict}>
        <div className="py-4">
          <AdminHeader>
            {type === "add" ? "Add District" : "Update District"}
          </AdminHeader>
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
                    {options.map((option) => (
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
            {type === "add" ? "Add District" : "Update District"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default DistrictForm;
