import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AdminHeader from "../AdminHeader";
import API from "@/utils/API";
import { tst } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

function ThemeForm({ type = "add", onSubmit }) {
  const { themeId } = useParams();
  const [formData, setFormData] = useState({
    theme_name: "",
  });
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (type === "update" && themeId) {
      const fetchThemeDetails = async () => {
        try {
          const { data } = await API.get(`/api/v1/theme/${themeId}`);
          setFormData(data?.theme || {});
        } catch (error) {
          console.error("Failed to fetch theme details.", error);
        }
      };

      fetchThemeDetails();
    }
  }, [type, themeId]);

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
        await API.post("/api/v1/theme/create", formData);
        tst.success("Theme created successfully");
      } else {
        await API.put(`/api/v1/theme/${themeId}`, formData);
        tst.success("Theme updated successfully");
      }
    } catch (error) {
      tst.error("Failed to submit form:", error);
    } finally {
      setPending(false);
    }
  };

  const fields = [
    { name: "theme_name", label: "Theme Name", type: "text", required: true },
  ];

  return (
    <div className="container mx-auto p-6">
      <form onSubmit={handleSubmit}>
        <div className="py-4">
          <AdminHeader>{type === "add" ? "Add Theme" : "Update Theme"}</AdminHeader>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
            {fields.map(({ name, label, type, required }) => (
              <div key={name}>
                <Label htmlFor={name} className="inline-block mb-2">
                  {label}
                </Label>
                {required && <span className="text-red-500 ml-1">*</span>}
                {type === "textarea" ? (
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
            {type === "add" ? "Add Theme" : "Update Theme"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ThemeForm;
