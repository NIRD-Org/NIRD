import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import API from "@/utils/API";
import AdminHeader from "../AdminHeader";
import { tst } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import useThemes from "@/components/hooks/location/useThemes";

function DataPointForm({ update }) {
  const { kpiId } = useParams();
  const [formData, setFormData] = useState({});
  const [pending, setPending] = useState(false);
  const { themes } = useThemes();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (update) {
      const fetchKpiDetails = async () => {
        try {
          const { data } = await API.get(`/api/v1/kpi/${kpiId}`);
          setFormData(data?.kpi || {});
        } catch (error) {
          console.error("Failed to fetch KPI details.", error);
        }
      };
      fetchKpiDetails();
    }
  }, [update, kpiId]);

  const handleSubmit = async e => {
    e.preventDefault();
    setPending(true);
    try {
      if (!update) {
        await API.post("/api/v1/kpi/create", formData);
        tst.success("KPI created successfully");
      } else {
        await API.put(`/api/v1/kpi/${kpiId}`, formData);
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
      options: themes.map(theme => ({
        value: theme.id,
        label: theme.theme_name,
      })),
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
    {
      name: "score_rules",
      label: "Score",
      type: "textarea",
      required: true,
    },
    {
      name: "remark",
      label: "Remark",
      type: "textarea",
      // required: true,
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <form onSubmit={handleSubmit}>
        <div className="py-4">
          <AdminHeader>{!update ? "Add KPI" : "Update KPI"}</AdminHeader>
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
                    className="bg-white w-full col-span-3 px-4 py-2 rounded-md bg-transparent border"
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
                ) : type === "textarea" ? (
                  <Textarea
                    required={required}
                    disabled={pending}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    id={name}
                    placeholder={`Enter ${label}`}
                  />
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
            {!update ? "Add KPI" : "Update KPI"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default DataPointForm;
