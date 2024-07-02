import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import API from "@/utils/API";
import { tst } from "@/lib/utils";
import AdminHeader from "../AdminHeader";
import { useParams } from "react-router-dom";

function DynamicForm({ formConfig, endpoint, update }) {
  const [formData, setFormData] = useState({});
  const [pending, setPending] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (update) {
      const fetchData = async () => {
        try {
          const { data } = await API.get(`${endpoint}/${id}`);
          setFormData(data);
        } catch (error) {
          console.error("Failed to fetch data for update.", error);
        }
      };
      fetchData();
    }
  }, [update, endpoint, formData.id]);

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
      if (update) {
        await API.put(`${endpoint}/${id}`, formData);
        tst.success("Updated successfully");
      } else {
        await API.post(endpoint, formData);
        tst.success("Created successfully");
      }
    } catch (error) {
      tst.error("Failed to submit form:", error);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <form onSubmit={handleSubmit}>
        <div className="py-4">
          <AdminHeader>{update ? `Update ${formConfig.title}` : `Add ${formConfig.title}`}</AdminHeader>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
            {formConfig.fields.map(({ name, label, type, options, required }) => (
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
                    value={formData[name] || ""}
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
                    value={formData[name] || ""}
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
            {update ? `Update ${formConfig.title}` : `Add ${formConfig.title}`}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default DynamicForm;
