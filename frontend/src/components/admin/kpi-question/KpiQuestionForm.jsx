import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import API from "@/utils/API";
import AdminHeader from "../AdminHeader";
import { tst } from "@/lib/utils";

function KpiQuestionForm({ type = "add", kpiQuestion }) {
  const [formData, setFormData] = useState({
    id: kpiQuestion?.id || "",
    theme_id: kpiQuestion?.theme_id || "",
    kpi_id: kpiQuestion?.kpi_id || "",
    question_name: kpiQuestion?.question_name || "",
    input_type: kpiQuestion?.input_type || "",
    question_type: kpiQuestion?.question_type || "",
  });
  const [themes, setThemes] = useState([]);
  const [kpis, setKpis] = useState([]);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    async function fetchThemes() {
      try {
        const { data } = await API.get("/api/v1/theme/all");
        setThemes(data?.themes || []);
      } catch (error) {
        console.error("Failed to fetch themes.", error);
      }
    }

    fetchThemes();
  }, []);

  useEffect(() => {
    async function fetchKpis() {
      if (formData.theme_id) {
        try {
          const { data } = await API.get(`/api/v1/kpi/theme/${formData.theme_id}`);
          setKpis(data?.KPI || []);
        } catch (error) {
          console.error("Failed to fetch KPIs.", error);
        }
      }
    }

    fetchKpis();
  }, [formData.theme_id]);

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
        await API.post("/api/v1/kpi-questions/create", formData);
        tst.success("KPI Question created successfully");
      } else {
        await API.put(`/api/v1/kpi-questions/${formData.id}`, formData);
        tst.success("KPI Question updated successfully");
      }
    } catch (error) {
      tst.error("Failed to submit form:", error);
    } finally {
      setPending(false);
    }
  };

  const fields = [
    {
      name: "theme_id",
      label: "Theme",
      type: "select",
      options: themes.map((theme) => ({ value: theme.id, label: theme.theme_name })),
      required: true,
    },
    {
      name: "kpi_id",
      label: "KPI",
      type: "select",
      options: kpis.map((kpi) => ({ value: kpi.id, label: kpi.kpi_name })),
      required: true,
    },
    {
      name: "question_name",
      label: "Question Name",
      type: "textarea",
      required: true,
    },
    {
      name: "input_type",
      label: "Input Type",
      type: "select",
      options: [
        { value: "number", label: "Number" },
        { value: "percentage", label: "Percentage" },
      ],
      required: true,
    },
    {
      name: "question_type",
      label: "Question Type",
      type: "select",
      options: [
        { value: "positive", label: "Positive" },
        { value: "negative", label: "Negative" },
      ],
      required: true,
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <form onSubmit={handleSubmit}>
        <div className="py-4">
          <AdminHeader>{type === "add" ? "Add KPI Question" : "Update KPI Question"}</AdminHeader>
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
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : type === "textarea" ? (
                  <textarea
                    required={required}
                    disabled={pending}
                    className="w-full col-span-3 px-4 py-2 rounded-md bg-transparent border"
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
            {type === "add" ? "Add KPI Question" : "Update KPI Question"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default KpiQuestionForm;
