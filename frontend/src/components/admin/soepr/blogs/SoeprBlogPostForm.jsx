import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import API from "@/utils/API";
import { showAlert } from "@/utils/showAlert";
import React, { useState } from "react";
import toast from "react-hot-toast";

const BlogPost = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    content: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    image: "",
    content: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    setErrors({ ...errors, image: "" });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required.";
      isValid = false;
    }

    if (!formData.image) {
      newErrors.image = "Image is required.";
      isValid = false;
    }

    if (!formData.content.trim()) {
      newErrors.content = "Content is required.";
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
      formDataToSubmit.append("image", formData.image);
      formDataToSubmit.append("content", formData.content);

      const { data } = await API.post("/api/v1/blog/create", formDataToSubmit, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      showAlert("Achievement post created successfully!", "success");
      setFormData({ title: "", image: "", content: "" });
      window.location.reload()
    } catch (error) {
      showAlert("An error occurred while submitting the form.","error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="max-w-xl mx-auto p-6 bg-white border rounded-md"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-bold mb-4 text-center text-primary">Create an Achievement Post</h1>

      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Title
        </label>
        <Input
          id="title"
          name="title"
          placeholder="Enter the Achievement title"
          value={formData.title}
          onChange={handleChange}
          className={cn(errors.title && "border-red-500")}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="image" className="block text-sm font-medium mb-1">
          Image
        </label>
        <Input
          id="image"
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className={cn(errors.image && "border-red-500")}
        />
        {errors.image && (
          <p className="text-red-500 text-sm mt-1">{errors.image}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="content" className="block text-sm font-medium mb-1">
          Content
        </label>
        <Textarea
          id="content"
          name="content"
          placeholder="Write your Achievement content here"
          value={formData.content}
          onChange={handleChange}
          className={cn(errors.content && "border-red-500")}
          rows={5}
        />
        {errors.content && (
          <p className="text-red-500 text-sm mt-1">{errors.content}</p>
        )}
      </div>

      <Button type="submit" pending={isSubmitting} className="w-full">
        {isSubmitting ? "Submitting..." : "Create Achievement Post"}
      </Button>
    </form>
  );
};

export default BlogPost;
