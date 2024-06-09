import React, { useState } from "react";
import { DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { themes } from "@/lib/data"; 

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
          <Select
            className="w-full"
            value={formData.theme_id}
            onValueChange={value =>
              setFormData(prevData => ({
                ...prevData,
                theme_id: value,
              }))
            }
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select a theme" />
            </SelectTrigger>
            <SelectContent>
              {themes?.map(theme => (
                <SelectItem key={theme.id} value={theme.id}>
                  {theme.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
          <Label htmlFor="status" className="text-right mt-2">
            Status
          </Label>
          <Input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
            id="status"
            placeholder="Enter Status"
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
          <Label htmlFor="created_by" className="text-right mt-2">
            Created By
          </Label>
          <Input
            type="text"
            name="created_by"
            value={formData.created_by}
            onChange={handleChange}
            id="created_by"
            placeholder="Enter Created By"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Label htmlFor="modified_by" className="text-right mt-2">
            Modified By
          </Label>
          <Input
            type="text"
            name="modified_by"
            value={formData.modified_by}
            onChange={handleChange}
            id="modified_by"
            placeholder="Enter Modified By"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Label htmlFor="flag" className="text-right mt-2">
            Flag
          </Label>
          <Input
            type="text"
            name="flag"
            value={formData.flag}
            onChange={handleChange}
            id="flag"
            placeholder="Enter Flag"
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
