import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { tst } from "@/lib/utils";
import AdminHeader from "../../AdminHeader";
import FormField from "@/components/ui/formfield";

function SrConsultantProfileForm() {
  const [pending, setPending] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    email: "",
    mobile: "",
    qualification: "",
    dateOfJoining: "",
    deploymentState: "",
    areaOfExpertise: "",
    photograph: null,
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = e => {
    const { name, files } = e.target;
    setFormData(prev => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setPending(true);
      // Implement the API call here
      setTimeout(() => {
        tst.success("Profile upload successful");
        setPending(false);
      }, 3000);
    } catch (error) {
      console.error(error);
      tst.error(error);
    } finally {
      // setPending(false);
    }
  };

  const fields = [
    {
      label: "Full Name",
      name: "fullName",
      type: "text",
      required: true,
    },
    {
      label: "Gender",
      name: "gender",
      type: "select",
      options: ["Male", "Female", "Other"],
      required: true,
    },
    {
      label: "Email ID",
      name: "email",
      type: "email",
      required: true,
    },
    {
      label: "Mobile No.",
      name: "mobile",
      type: "text",
      required: true,
    },
    {
      label: "Qualification",
      name: "qualification",
      type: "text",
      required: true,
    },
    {
      label: "Date of Joining",
      name: "dateOfJoining",
      type: "date",
      required: true,
    },
    {
      label: "Deployment State",
      name: "deploymentState",
      type: "select",
      options: ["State 1", "State 2", "State 3", "State 4"],
      required: true,
    },
    {
      label: "Area of Expertise",
      name: "areaOfExpertise",
      type: "textarea",
      required: true,
      maxOptions: 4,
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <AdminHeader>Sr. Consultant Profile Form</AdminHeader>
      <form onSubmit={handleSubmit}>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {fields.map(field => (
            <FormField
              key={field.name}
              {...field}
              disabled={pending}
              value={formData[field.name] || ""}
              onChange={handleInputChange}
              onFileChange={handleFileChange}
            />
          ))}
          <div>
            <Label className="mb-2 inline-block">Upload Latest Professional Photograph</Label>
            <Input type="file" name="photograph" onChange={handleFileChange} required />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-10 mt-10">
          <Button type="submit" pending={pending}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SrConsultantProfileForm;