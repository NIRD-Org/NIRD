import React, { useEffect, useState } from "react";
import { DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import API from "@/utils/API";

function KpiForm({ type, onSubmit, kpi }) {
  const [formData, setFormData] = useState({
    id: kpi ? kpi.id : "",
    theme_id: kpi ? kpi.theme_id : "",
    kpi_name: kpi ? kpi.kpi_name : "",
    max_range: kpi ? kpi.max_range : "",
    Input_Type: kpi ? kpi.Input_Type : "",
    status: kpi ? kpi.status : "",
    weightage: kpi ? kpi.weightage : "",
    created_by: kpi ? kpi.created_by : "",
    modified_by: kpi ? kpi.modified_by : "",
    flag: kpi ? kpi.flag : "",
  });

  const [pending, setPending] = useState(false);
  const [themes, setThemes] = useState([]);

  const getAllThemes = async () => {
    try {
      const { data } = await API.get(`/api/v1/theme/all`);
      setThemes(data?.themes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllThemes();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setPending(true);
    onSubmit(formData);
    setPending(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>{type === "add" ? "Add KPI" : "Update KPI"}</DialogTitle>
        <DialogDescription>
          {type === "add"
            ? "Add a new Key Performance Indicator"
            : "Update Key Performance Indicator details"}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 gap-4">
          <Label htmlFor="theme_id" className="text-right mt-2">
            Theme
          </Label>
          <select
            className="w-full col-span-3 px-4 py-2 rounded-md bg-transparent border"
            value={formData.theme_id}
            onChange={e => setFormData(prevData => ({ ...prevData, theme_id: e.target.value }))}
          >
            <option value="" disabled>
              Select a theme
            </option>
            {themes?.map(theme => (
              <option key={theme.id} value={theme.id}>
                {theme.theme_name}
              </option>
            ))}
          </select>
        </div>
        {/* Add other form fields similar to the example below */}
        <div className="grid grid-cols-4 gap-4">
          <Label htmlFor="max_range" className="text-right mt-2">
            Max Range
          </Label>
          <Input
            type="number"
            name="max_range"
            value={formData.max_range}
            onChange={handleChange}
            id="max_range"
            placeholder="Enter Max Range"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Label htmlFor="Input_Type" className="text-right mt-2">
            Input Type
          </Label>
          <Input
            type="text"
            name="Input_Type"
            value={formData.Input_Type}
            onChange={handleChange}
            id="Input_Type"
            placeholder="Enter Input Type"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Label htmlFor="weightage" className="text-right mt-2">
            Weightage
          </Label>
          <Input
            type="number"
            name="weightage"
            value={formData.weightage}
            onChange={handleChange}
            id="weightage"
            placeholder="Enter Weightage"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Label htmlFor="kpi_name" className="text-right mt-2">
            KPI Name
          </Label>
          <Input
            type="text"
            name="kpi_name"
            value={formData.kpi_name}
            onChange={handleChange}
            id="kpi_name"
            placeholder="Enter KPI Name"
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button pending={pending} type="submit">
          {type === "add" ? "Add KPI" : "Update KPI"}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default KpiForm;
