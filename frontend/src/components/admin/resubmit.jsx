import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "@/utils/API";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { tst } from "@/lib/utils";
import AdminHeader from "@/components/admin/AdminHeader";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const TrainingResubmit = () => {
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);
  const { id } = useParams();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchTraining = async () => {
      try {
        const { data } = await API.get(`/api/v1/training/${id}`);
        setFormData(data?.data);
      } catch (error) {
        console.error("Error fetching Training:", error);
      }
    };
    fetchTraining();
  }, [id]);

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
      await API.put(`/api/v1/training/${formData.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      tst.success("Data submitted successfully");
    } catch (error) {
      tst.error("Failed to submit form");
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
    },
    {
      label: "Upload Training Design (PDF)",
      name: "trainingDesign",
      type: "file",
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

export default TrainingResubmit;
