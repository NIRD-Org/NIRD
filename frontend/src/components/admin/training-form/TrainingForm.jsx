import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "@/utils/API";
import { Button } from "@/components/ui/button";
import AdminHeader from "../AdminHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { tst } from "@/lib/utils";

const TrainingForm = () => {
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);

  const [formData, setFormData] = useState({
    programmeCode: "",
    type: "",
    onlineOffline: "",
    title: "",
    dates: "",
    duration: "",
    venue: "",
    govtOfficials: "",
    bankersCommOrgns: "",
    zpPRIs: "",
    volOrgnsNGOs: "",
    natlStateInstts: "",
    univColleges: "",
    international: "",
    others: "",
    total: "",
    female: "",
    trainingMethods: "",
    totalSessions: "",
    totalSessionTime: "",
    evaluation: "",
    trainingPhotos: null,
    trainingDesign: null,
    coOrdinate: "",
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = e => {
    const { name } = e.target;
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, [name]: file }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setPending(true);
      await API.post("/api/v1/training/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      tst.success("Data uploaded successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setPending(false);
    }
  };

  const formFields = [
    {
      label: "Programme Code",
      name: "programmeCode",
      type: "text",
      required: true,
    },
    {
      label: "Training/Workshop/Seminar/Webinar",
      name: "type",
      type: "text",
      required: true,
    },
    {
      label: "Online/Offline",
      name: "onlineOffline",
      type: "text",
      required: true,
    },
    { label: "Title", name: "title", type: "text", required: true },
    { label: "Dates", name: "dates", type: "text", required: true },
    { label: "Duration", name: "duration", type: "text", required: true },
    { label: "Venue", name: "venue", type: "text", required: true },
    {
      label: "Govt. Officials",
      name: "govtOfficials",
      type: "number",
      required: true,
    },
    {
      label: "Bankers & Comm Orgns.",
      name: "bankersCommOrgns",
      type: "number",
      required: true,
    },
    { label: "ZP & PRIs", name: "zpPRIs", type: "number", required: true },
    {
      label: "Vol. Orgns/NGOs",
      name: "volOrgnsNGOs",
      type: "number",
      required: true,
    },
    {
      label: "Natl. / State Instts for Res. & Trg",
      name: "natlStateInstts",
      type: "number",
      required: true,
    },
    {
      label: "Univ. / Colleges",
      name: "univColleges",
      type: "number",
      required: true,
    },
    {
      label: "International",
      name: "international",
      type: "number",
      required: true,
    },
    {
      label: "Others/Youth/PSUs/Individuals",
      name: "others",
      type: "number",
      required: true,
    },
    { label: "Total", name: "total", type: "number", required: true },
    { label: "Female", name: "female", type: "number", required: true },
    {
      label: "Training Methods",
      name: "trainingMethods",
      type: "text",
      required: true,
    },
    {
      label: "Total Sessions",
      name: "totalSessions",
      type: "number",
      required: true,
    },
    {
      label: "Total Session Time (Hrs)",
      name: "totalSessionTime",
      type: "number",
      required: true,
    },
    {
      label: "Evaluation is done on TMP/Google Form",
      name: "evaluation",
      type: "text",
      required: true,
    },
    {
      label: "Upload Training Photos",
      name: "trainingPhotos",
      type: "file",
      required: true,
    },
    {
      label: "Upload Training Design (PDF)",
      name: "trainingDesign",
      type: "file",
      required: true,
    },
    {
      label: "Co Ordinate",
      name: "coOrdinate",
      type: "number",
      required: true,
    },
  ];

  return (
    <div className="p-2 md:p-6">
      <AdminHeader>Add Training Details</AdminHeader>
      <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {formFields.map((field, index) => (
          <div className="mb-4" key={index}>
            <Label className="inline-block font-bold mb-2">{field.label}</Label>
            {field.required && <span className="text-red-500 ml-1">*</span>}
            {field.type === "file" ? (
              <Input
                type={field.type}
                name={field.name}
                onChange={handleFileChange}
                required={field.required}
                className="block"
              />
            ) : (
              <Input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                required={field.required}
              />
            )}
          </div>
        ))}
        <Button
          pending={pending}
          type="submit"
          className="col-span-1 px-20 self-end"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default TrainingForm;
