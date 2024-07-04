import React, { useState, useEffect } from "react";
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
  const [financialYears, setFinancialYears] = useState([]);

  const [formData, setFormData] = useState({
    programmeCode: "",
    type: "",
    onlineOffline: "",
    title: "",
    dates: "",
    duration: "",
    venue: "",
    noOfERs: "",
    noOfGPFunctionaries: "",
    noOfMembersOfSHGs: "",
    noOfRepsFromVolOrgnsNGOs: "",
    noOfRepsFromNatlStateInstns: "",
    noOfPanchayatBandhus: "",
    noOfProjectStaffTrained: "",
    others: "",
    total: "",
    noOfFemale: "",
    noOfMale: "",
    trainingMethods: "",
    totalSessions: "",
    totalSessionTime: "",
    evalGoogle: "",
    trainingPhotos: null,
    trainingDesign: null,
    nameOfTrainingCoordinator: "",
    financialYear: "",
  });

  useEffect(() => {
    const startYear = 2022;
    const endYear = 2050;
    const years = [];

    for (let year = startYear; year <= endYear; year++) {
      years.push(`FY${year}-${year + 1}`);
    }

    setFinancialYears(years);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, [name]: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setPending(true);
      await API.post("/api/v1/training/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/admin");
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
    { label: "Dates", name: "dates", type: "date", required: true },
    { label: "Duration", name: "duration", type: "text", required: true },
    { label: "Venue", name: "venue", type: "text", required: true },
    { label: "No. of ERs", name: "noOfERs", type: "number", required: true },
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
    {
      label: "No. of Female",
      name: "noOfFemale",
      type: "number",
      required: true,
    },
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
      type: "select",
      options: ["Yes", "No"],
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
      label: "Financial Year (Drop down menu)",
      name: "financialYear",
      type: "select",
      options: financialYears,
      required: true,
    },
  ];

  return (
    <div className="p-2 md:p-6">
      <AdminHeader>Add Training Details</AdminHeader>
      <form
        onSubmit={handleSubmit}
        className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
      >
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
            ) : field.type === "select" ? (
              <select
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                required={field.required}
                className="block w-full border border-gray-300 p-2 rounded"
              >
                <option value="">Select an option</option>
                {field.options.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
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
        <div className="hidden md:block"></div>
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
