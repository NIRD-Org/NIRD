import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import API from "@/utils/API";
import AdminHeader from "../AdminHeader";
import { tst } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

function DataPointForm({ type = "add", onSubmit, kpi }) {
  const [formData, setFormData] = useState({
    id: kpi?.id || "",
    theme_id: kpi?.theme_id || "",
    kpi_name: kpi?.kpi_name || "",
    max_range: kpi?.max_range || "",
    input_type: kpi?.input_type || "",
    status: kpi?.status || "",
    weightage: kpi?.weightage || "",
    created_by: kpi?.created_by || "",
    modified_by: kpi?.modified_by || "",
    flag: kpi?.flag || "",
  });
  const [themes, setThemes] = useState([]);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const getAllThemes = async () => {
      try {
        const { data } = await API.get("/api/v1/theme/all");
        setThemes(data?.themes || []);
      } catch (error) {
        console.error("Failed to fetch themes.", error);
      }
    };

    getAllThemes();
  }, []);

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
        await API.post("/api/v1/kpi/create", formData);
        tst.success("KPI created successfully");
      } else {
        await API.put(`/api/v1/kpi/${formData.id}`, formData);
        tst.success("KPI updated successfully");
      }
    } catch (error) {
      tst.error(error);
    } finally {
      setPending(false);
    }
  };

  const fields = [
    {
      name: "theme_id",
      label: "Theme",
      type: "select",
      options: themes.map(theme => ({ value: theme.id, label: theme.theme_name })),
      required: true,
    },
    { name: "name", label: "KPI Name", type: "textarea", required: true },
    { name: "weightage", label: "Weightage", type: "number", required: true },
    {
      name: "kpi_datapoint",
      label: "Data Point",
      type: "textarea",
      required: true,
    },
    {
      name: "input_type",
      label: "Input Type",
      type: "textarea",
      required: true,
    },
    {
      name: "kpi_type",
      label: "KPI Type",
      type: "select",
      options: [
        { value: "positive", label: "Positive" },
        { value: "negative", label: "Negative" },
      ],
      required: true,
    },
    {
      name: "max_range",
      label: "Max Range",
      type: "number",
      required: true,
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <form onSubmit={handleSubmit}>
        <div className="py-4">
          <AdminHeader>{type === "add" ? "Add Data Point" : "Update KPI"}</AdminHeader>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
            {fields.map(({ name, label, type, options, required }) => (
              <div key={name}>
                <Label htmlFor={name} className="inline-block mb-2">
                  {label}
                </Label>
                {required && <span className="text-red-500 ml-1">*</span>}
                {type === "select" ? (
                  <select required={required} disabled={pending} className="bg-white w-full col-span-3 px-4 py-2 rounded-md bg-transparent border" value={formData[name]} name={name} onChange={handleChange}>
                    <option value="" disabled>
                      Select {label}
                    </option>
                    {options.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : type === "textarea" ? (
                  <Textarea required={required} disabled={pending} name={name} value={formData[name]} onChange={handleChange} id={name} placeholder={`Enter ${label}`} />
                ) : (
                  <Input required={required} disabled={pending} type={type} name={name} value={formData[name]} onChange={handleChange} id={name} placeholder={`Enter ${label}`} className="col-span-3" />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <Button pending={pending} type="submit">
            {type === "add" ? "Add KPI" : "Update KPI"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default DataPointForm;
