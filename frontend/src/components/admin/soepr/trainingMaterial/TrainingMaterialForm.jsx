import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import API from "@/utils/API";
import { showAlert } from "@/utils/showAlert";
import React, { useState } from "react";
import toast from "react-hot-toast";

const TrainingMaterialForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    file: null,
   
  });

  const [errors, setErrors] = useState({
    title: "",
    file: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file });
    setErrors({ ...errors, file: "" });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required.";
      isValid = false;
    }

    if (!formData.file) {
      newErrors.file = "File is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("title", formData.title);
      formDataToSubmit.append("file", formData.file);
     
      const { data } = await API.post(
        "/api/v1/training-material/create",
        formDataToSubmit,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      showAlert("Training material uploaded successfully!", "success");
      setFormData({ title: "", file: null });
      window.location.reload();
    } catch (error) {
      showAlert("An error occurred while submitting the form.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[90vh] sm:min-h-[70vh] flex items-center justify-center">
      <form
        className="max-w-3xl w-full  p-6 bg-white border rounded-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-primary">
          Upload Training Material
        </h1>

        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title
          </label>
          <Input
            id="title"
            name="title"
            placeholder="Enter the material title"
            value={formData.title}
            onChange={handleChange}
            className={cn(errors.title && "border-red-500")}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="file" className="block text-sm font-medium mb-1">
            File
          </label>
          <Input
            id="file"
            type="file"
            name="file"
            accept=".pdf"
            onChange={handleFileChange}
            className={cn(errors.file && "border-red-500")}
          />
          {errors.file && (
            <p className="text-red-500 text-sm mt-1">{errors.file}</p>
          )}
        </div>

        <Button type="submit" pending={isSubmitting} className="w-full">
          {isSubmitting ? "Submitting..." : "Upload Material"}
        </Button>
      </form>
    </div>
  );
};

export default TrainingMaterialForm;
