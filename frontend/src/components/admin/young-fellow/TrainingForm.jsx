import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "@/utils/API";
import { Button } from "@/components/ui/button";
import AdminHeader from "../AdminHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { tst } from "@/lib/utils";
import FormField from "@/components/ui/formfield";

const TrainingForm = () => {
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);

  const [formData, setFormData] = useState({});

  const handleInputChange = e => {
    const { name, type, checked, value } = e.target;
    console.log(name, checked);
    if (type === "checkbox") {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = e => {
    const { name } = e.target;
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, [name]: file }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(formData);

    try {
      setPending(true);
      await API.post("/api/v1/training/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      tst.success("Data uploaded successfully");
    } catch (error) {
      tst.error("Something went wrong");
      console.log(error);
    } finally {
      setPending(false);
    }
  };

  const fields = [
    {
      label: "Programme Code",
      name: "programmeCode",
      type: "text",
      required: true,
    },
    {
      label: "Training/Workshop/Seminar/Webinar/Off-Campus",
      name: "type",
      type: "text",
      required: true,
    },
    {
      label: "Online/Offline",
      name: "onlineOffline",
      type: "select",
      options: [
        { value: "Online", label: "Online" },
        { value: "Offline", label: "Offline" },
      ],
      required: true,
    },
    { label: "Title", name: "title", type: "text", required: true },
    { label: "Dates", name: "dates", type: "date", required: true },
    { label: "Duration", name: "duration", type: "text", required: true },
    { label: "Venue", name: "venue", type: "text", required: true },
    {
      label: "No. of ERs",
      name: "noOfERs",
      type: "number",
      required: true,
    },
    {
      label: "No. of GP Functionaries",
      name: "noOfGPFunctionaries",
      type: "number",
      required: true,
    },
    {
      label: "No. of Members of SHGs",
      name: "noOfMembersOfSHGs",
      type: "number",
      required: true,
    },
    {
      label: "No. of Reps. from Vol. Orgns/ NGOs",
      name: "noOfRepsFromVolOrgnsNGOs",
      type: "number",
      required: true,
    },
    {
      label: "No. of Reps. from Natl. / State Level Instns.",
      name: "noOfRepsFromNatlStateInstns",
      type: "number",
      required: true,
    },
    {
      label: "No. of Panchayat Bandhus",
      name: "noOfPanchayatBandhus",
      type: "number",
      required: true,
    },
    {
      label: "No. of Project Staff Trained",
      name: "noOfProjectStaffTrained",
      type: "number",
      required: true,
    },
    {
      label: "Others (Youth/PSUs/ Individuals etc.)",
      name: "others",
      type: "number",
      required: true,
    },
    { label: "Total", name: "total", type: "number", required: true },
    { label: "No. of Female", name: "noOfFemale", type: "number", required: true },
    { label: "No. of Male", name: "noOfMale", type: "number", required: true },
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
      name: "evalGoogle",
      type: "checkbox",
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
      label: "Name of the Training Coordinator",
      name: "nameOfTrainingCoordinator",
      type: "text",
      required: true,
    },
    {
      name: "financialYear",
      label: "Financial Year",
      type: "select",
      options: Array.from({ length: 30 }, (_, i) => {
        const startYear = 2021 + i;
        const endYear = startYear + 1;
        return { value: `FY${startYear}-${endYear}`, label: `FY${startYear}-${endYear}` };
      }),
      required: true,
    },
  ];

  return (
    <div className="p-2 md:p-6">
      <AdminHeader>Add Training Details</AdminHeader>
      <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
        <Button pending={pending} type="submit" className="col-span-1 px-20 self-end">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default TrainingForm;
