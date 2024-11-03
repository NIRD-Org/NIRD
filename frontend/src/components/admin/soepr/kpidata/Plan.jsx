import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormField from "@/components/ui/formfield";
import AdminHeader from "../../AdminHeader";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { showAlert } from "@/utils/showAlert";

function Plan() {
  const [pending, setPending] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    state: "",
    district: "",
    gp: "",
    planned: {},
    achieved: {},
    yesNo: {},
    numbers: {},
  });
  const [calculatedPercentages, setCalculatedPercentages] = useState({});
  const navigate = useNavigate();

  // Define the dropdown options (these could be fetched from an API or be static)
  const states = ["State1", "State2", "State3"];
  const districts = ["District1", "District2", "District3"];
  const gps = ["GP1", "GP2", "GP3"];

  const fields = [
    { name: "Ward Sabhas Recorded", type: "percentage" },
    { name: "Mahila Sabhas Recorded", type: "percentage" },
    { name: "Agenda Circulation", type: "yesNo" },
    { name: "Gram Sabha Recorded", type: "percentage" },
    { name: "Members Attended Gram Sabha", type: "percentage" },
    { name: "Action Taken Report Discussion", type: "yesNo" },
    { name: "Meeting Minutes Uploaded", type: "yesNo" },
    { name: "Video of Gram Sabha Uploaded", type: "yesNo" },
    { name: "State Level TNAs Facilitated", type: "percentage" },
    { name: "State Training Calendar Prepared", type: "percentage" },
    { name: "District Training Calendar Prepared", type: "percentage" },
    { name: "Block Training Calendar Prepared", type: "percentage" },
    { name: "Trainings Facilitated", type: "percentage" },
    { name: "Training Materials Prepared", type: "percentage" },
    { name: "Learning Materials Developed", type: "percentage" },
    { name: "Training Sessions Conducted", type: "number" },
    { name: "Training/Trainees Evaluation Completed", type: "yesNo" },
    { name: "Training Evaluation Completed", type: "percentage" },
    { name: "Participants Scored (50-100%)", type: "number" },
    { name: "Training Institutions Visited", type: "percentage" },
    { name: "GP Profiler Updation", type: "percentage" },
    { name: "GPDP Activities Description Quality", type: "percentage" },
    { name: "Flagship Schemes Covered", type: "number" },
    { name: "Own Source Revenue in Resource Envelope", type: "number" },
    { name: "Sankalp Theme Activities Implemented", type: "percentage" },
    { name: "Resources Allocated in Sankalp Theme", type: "percentage" },
    { name: "Low-Cost Infrastructure Activities", type: "number" },
    { name: "No-Cost Non-Infrastructure Activities", type: "number" },
    {
      name: "Expenditure on Planned Activities (Last 3 Years)",
      type: "number",
    },
    { name: "Completed GPDP Activities", type: "number" },
    { name: "Abandoned GPDP Activities", type: "number" },
    { name: "OSR Rule Prepared", type: "yesNo" },
    { name: "Average OSR Collection (Last 2 Years)", type: "number" },
    { name: "Current Year OSR Collection", type: "number" },
    { name: "Increase in OSR Collection (Previous Year)", type: "percentage" },
    { name: "Services Delivered by GP", type: "percentage" },
    { name: "Amount from Service Delivery", type: "number" },
    { name: "Previous Year PDI Score", type: "number" },
    { name: "Current Year PDI Score", type: "number" },
    { name: "Visits to District Panchayat Officer", type: "number" },
    { name: "Visits to District Magistrate", type: "number" },
    { name: "Visits to District Level Officers", type: "number" },
    { name: "Visits to NGOs", type: "number" },
    { name: "Monitoring Visits to Model GP Clusters", type: "number" },
    { name: "Mentoring Visits to Gram Panchayats", type: "number" },
    { name: "Case Studies Prepared", type: "number" },
    { name: "Good Practices Documented", type: "number" },
  ];

  React.useEffect(() => {
    const now = new Date();
    setFormData((prev) => ({
      ...prev,
      date: now.toISOString().split("T")[0],
    }));
  }, []);

  const handleInputChange = (e, type, field) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }));
    if (type === "planned" || type === "achieved") {
      calculatePercentage(field);
    }
  };

  const calculatePercentage = (field) => {
    const planned = parseFloat(formData.planned[field]) || 0;
    const achieved = parseFloat(formData.achieved[field]) || 0;
    const percentage = planned !== 0 ? (achieved / planned) * 100 : 0;
    setCalculatedPercentages((prev) => ({
      ...prev,
      [field]: percentage.toFixed(2),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    try {
      // Add your form submission logic here (e.g., API call)
      showAlert("KPI entry submitted successfully", "success");
      navigate("/success"); // Navigate to a success page or another route
    } catch (error) {
      toast.error("Submission failed");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <AdminHeader>KPI Entry Form</AdminHeader>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <Label>State</Label>
          <FormField
            label="State"
            name="state"
            type="select"
            required
            options={states.map((state) => ({ value: state, label: state }))}
            value={formData.state}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, state: e.target.value }))
            }
          />
        </div>
        <div className="mb-6">
          <Label>District</Label>
          <FormField
            label="District"
            name="district"
            type="select"
            required
            options={districts.map((district) => ({
              value: district,
              label: district,
            }))}
            value={formData.district}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, district: e.target.value }))
            }
          />
        </div>
        <div className="mb-6">
          <Label>Gram Panchayat (GP)</Label>
          <FormField
            label="GP"
            name="gp"
            type="select"
            required
            options={gps.map((gp) => ({ value: gp, label: gp }))}
            value={formData.gp}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, gp: e.target.value }))
            }
          />
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Date</Label>
            <Input type="date" name="date" value={formData.date} readOnly />
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Percentages</h3>
          {fields
            .filter((field) => field.type === "percentage")
            .map((field, index) => (
              <div key={index} className="mb-6">
                <Label>{field.name}</Label>
                <div className="flex space-x-4">
                  <Input
                    type="number"
                    placeholder="Planned"
                    name={`planned[${field.name}]`}
                    value={formData.planned[field.name] || ""}
                    onChange={(e) =>
                      handleInputChange(e, "planned", field.name)
                    }
                    className="w-1/2 p-2 border rounded-md"
                  />
                  <Input
                    type="number"
                    placeholder="Achieved"
                    name={`achieved[${field.name}]`}
                    value={formData.achieved[field.name] || ""}
                    onChange={(e) =>
                      handleInputChange(e, "achieved", field.name)
                    }
                    className="w-1/2 p-2 border rounded-md"
                  />
                </div>
                <p className="mt-2 text-gray-600">
                  Calculated: {calculatedPercentages[field.name] || 0}%
                </p>
              </div>
            ))}
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Yes/No</h3>
          {fields
            .filter((field) => field.type === "yesNo")
            .map((field, index) => (
              <div key={index} className="mb-6">
                <FormField
                  label={field.name}
                  name={field.name}
                  type="select"
                  required
                  options={[
                    { value: "Yes", label: "Yes" },
                    { value: "No", label: "No" },
                  ]}
                  value={formData.yesNo[field.name] || ""}
                  onChange={(e) => handleInputChange(e, "yesNo", field.name)}
                />
              </div>
            ))}
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Numbers</h3>
          {fields
            .filter((field) => field.type === "number")
            .map((field, index) => (
              <div key={index} className="mb-6">
                <Label>{field.name}</Label>
                <div className="flex space-x-4">
                  <Input
                    type="number"
                    placeholder="Planned"
                    name={`planned[${field.name}]`}
                    value={formData.planned[field.name] || ""}
                    onChange={(e) =>
                      handleInputChange(e, "planned", field.name)
                    }
                    className="w-1/2 p-2 border rounded-md"
                  />
                  <Input
                    type="number"
                    placeholder="Achieved"
                    name={`achieved[${field.name}]`}
                    value={formData.achieved[field.name] || ""}
                    onChange={(e) =>
                      handleInputChange(e, "achieved", field.name)
                    }
                    className="w-1/2 p-2 border rounded-md"
                  />
                </div>
              </div>
            ))}
        </div>
        <div className="flex justify-center mt-6">
          <Button type="submit" pending={pending} disabled={pending}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Plan;
