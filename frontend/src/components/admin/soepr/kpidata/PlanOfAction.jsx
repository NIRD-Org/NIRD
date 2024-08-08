import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormField from "@/components/ui/formfield";
import AdminHeader from "../../AdminHeader";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function PlanOfAction() {
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
    { name: 'Ward Sabhas ', type: 'percentage' },
    { name: 'Mahila Sabhas ', type: 'percentage' },
    { name: 'Agenda Circulation', type: 'yesNo' },
    { name: 'Gram Sabha ', type: 'percentage' },
    { name: 'Members Attended Gram Sabha', type: 'percentage' },
    { name: 'Action Taken Report Discussion', type: 'yesNo' },
    { name: 'Meeting Minutes Uploaded', type: 'yesNo' },
    { name: 'Video of Gram Sabha Uploaded', type: 'yesNo' },
    { name: 'State Level TNAs Facilitated', type: 'percentage' },
    { name: 'State Training Calendar Prepared', type: 'percentage' },
    { name: 'District Training Calendar Prepared', type: 'percentage' },
    { name: 'Block Training Calendar Prepared', type: 'percentage' },
    { name: 'Trainings Facilitated', type: 'percentage' },
    { name: 'Training Materials Prepared', type: 'percentage' },
    { name: 'Learning Materials Developed', type: 'percentage' },
    { name: 'Training Sessions Conducted', type: 'number' },
    { name: 'Training/Trainees Evaluation Completed', type: 'yesNo' },
    { name: 'Training Evaluation Completed', type: 'percentage' },
    { name: 'Participants Scored (50-100%)', type: 'number' },
    { name: 'Training Institutions Visited', type: 'percentage' },
    { name: 'GP Profiler Updation', type: 'percentage' },
    { name: 'GPDP Activities Description Quality', type: 'percentage' },
    { name: 'Flagship Schemes Covered', type: 'number' },
    { name: 'Own Source Revenue in Resource Envelope', type: 'number' },
    { name: 'Sankalp Theme Activities Implemented', type: 'percentage' },
    { name: 'Resources Allocated in Sankalp Theme', type: 'percentage' },
    { name: 'Low-Cost Infrastructure Activities', type: 'number' },
    { name: 'No-Cost Non-Infrastructure Activities', type: 'number' },
    { name: 'Expenditure on Planned Activities (Last 3 Years)', type: 'number' },
    { name: 'GPDP Activities', type: 'number' },
    { name: 'OSR Rule Prepared', type: 'yesNo' },
    { name: 'Current Year OSR Collection', type: 'number' },
    { name: 'Services Delivered by GP', type: 'percentage' },
    { name: 'Amount from Service Delivery', type: 'number' },
    { name: 'Current Year PDI Score', type: 'number' },
    { name: 'Visits to District Panchayat Officer', type: 'number' },
    { name: 'Visits to District Magistrate', type: 'number' },
    { name: 'Visits to District Level Officers', type: 'number' },
    { name: 'Visits to NGOs', type: 'number' },
    { name: 'Monitoring Visits to Model GP Clusters', type: 'number' },
    { name: 'Mentoring Visits to Gram Panchayats', type: 'number' },
    { name: 'Case Studies Prepared', type: 'number' },
    { name: 'Good Practices', type: 'number' },
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
    if (type === 'planned' || type === 'achieved') {
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
      toast.success("KPI entry submitted successfully");
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
        {/* State, District, GP on One Line */}
        <div className="mb-6 flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            
            <FormField
              label="State"
              name="state"
              type="select"
              required
              options={states.map(state => ({ value: state, label: state }))}
              value={formData.state}
              onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            
            <FormField
              label="District"
              name="district"
              type="select"
              required
              options={districts.map(district => ({ value: district, label: district }))}
              value={formData.district}
              onChange={(e) => setFormData(prev => ({ ...prev, district: e.target.value }))}
            />
          </div>
          <div className="flex-1 min-w-[200px]">
           
            <FormField
              label="Gram Panchayat (GP)"
              name="gp"
              type="select"
              required
              options={gps.map(gp => ({ value: gp, label: gp }))}
              value={formData.gp}
              onChange={(e) => setFormData(prev => ({ ...prev, gp: e.target.value }))}
            />
          </div>
        </div>

        <div className="flex-1 min-w-[200px] mb-6">
        <Label>Date</Label>
  <Input
  Label="Date"
    type="Date"
    name="date"
    value={formData.date}
    readOnly
    className="w-[150px] p-2 border rounded-md"  // Set fixed width here
  />
</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Percentages */}
          {fields.filter(field => field.type === 'percentage').map((field, index) => (
            <div key={index} className="flex flex-col">
              <Label className="text-sm">{field.name}</Label>
              <Input
                type="number"
                placeholder="Planned"
                name={`planned[${field.name}]`}
                value={formData.planned[field.name] || ""}
                onChange={(e) => handleInputChange(e, 'planned', field.name)}
                className="mb-2 p-1 border rounded-md"
              />
              <Input
                type="number"
                placeholder="Achieved"
                name={`achieved[${field.name}]`}
                value={formData.achieved[field.name] || ""}
                onChange={(e) => handleInputChange(e, 'achieved', field.name)}
                className="mb-2 p-1 border rounded-md"
              />
              <p className="text-sm">
                {calculatedPercentages[field.name] || 0}%
              </p>
            </div>
          ))}
          {/* Yes/No */}
          {fields.filter(field => field.type === 'yesNo').map((field, index) => (
            <div key={index} className="flex flex-col">
              <Label className="text-sm">{field.name}</Label>
              <FormField
                name={field.name}
                type="select"
                required
                options={[
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ]}
                value={formData.yesNo[field.name] || ""}
                onChange={(e) => handleInputChange(e, 'yesNo', field.name)}
                className="mb-2"
              />
            </div>
          ))}
          {/* Numbers */}
          {fields.filter(field => field.type === 'number').map((field, index) => (
            <div key={index} className="flex flex-col">
              <Label className="text-sm">{field.name}</Label>
              <Input
                type="number"
                placeholder="Planned"
                name={`planned[${field.name}]`}
                value={formData.planned[field.name] || ""}
                onChange={(e) => handleInputChange(e, 'planned', field.name)}
                className="mb-2 p-1 border rounded-md"
              />
              <Input
                type="number"
                placeholder="Achieved"
                name={`achieved[${field.name}]`}
                value={formData.achieved[field.name] || ""}
                onChange={(e) => handleInputChange(e, 'achieved', field.name)}
                className="mb-2 p-1 border rounded-md"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Button
            type="submit"
            pending={pending}
            disabled={pending}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PlanOfAction;
