import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import API from "@/utils/API";
import AdminHeader from "../../AdminHeader";
import { tst } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { showAlert } from "@/utils/showAlert";

function DataPointForm({ type = "add", onSubmit }) {
  const { kpiId } = useParams();
  const [formData, setFormData] = useState({
    theme_id: "",
    kpi_name: "",
    max_range: "",
    input_type: "",
    weightage: "",
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

  useEffect(() => {
    if (type === "update" && kpiId) {
      const fetchKpiDetails = async () => {
        try {
          const { data } = await API.get(`/api/v1/kpi/${kpiId}`);
          console.log(data);
          setFormData(data?.kpi || {});
        } catch (error) {
          console.error("Failed to fetch KPI details.", error);
        }
      };

      fetchKpiDetails();
    }
  }, [type, kpiId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    try {
      if (type === "add") {
        await API.post("/api/v1/kpi/create", formData);
        showAlert("KPI created successfully", "success");
      } else {
        await API.put(`/api/v1/kpi/${kpiId}`, formData);
        showAlert("KPI updated successfully", "success");
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
      options: themes.map((theme) => ({
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
          <AdminHeader>{type === "add" ? "Add KPI" : "Update KPI"}</AdminHeader>
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
                    {options.map((option) => (
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
            {type === "add" ? "Add KPI" : "Update KPI"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default DataPointForm;
