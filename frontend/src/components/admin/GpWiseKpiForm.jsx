import React, { useState } from "react";
import { DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function GpWiseKpiForm({ type, onSubmit, gpWiseKpi }) {
  const [formData, setFormData] = useState({
    state_id: gpWiseKpi ? gpWiseKpi.state_id : "",
    district_id: gpWiseKpi ? gpWiseKpi.district_id : "",
    taluk_id: gpWiseKpi ? gpWiseKpi.taluk_id : "",
    gp_id: gpWiseKpi ? gpWiseKpi.gp_id : "",
    date: gpWiseKpi ? gpWiseKpi.date : "",
    theme_id: gpWiseKpi ? gpWiseKpi.theme_id : "",
    kpi_id: gpWiseKpi ? gpWiseKpi.kpi_id : "",
    question_id: gpWiseKpi ? gpWiseKpi.question_id : "",
    max_range: gpWiseKpi ? gpWiseKpi.max_range : "",
    input_data: gpWiseKpi ? gpWiseKpi.input_data : "",
    remarks: gpWiseKpi ? gpWiseKpi.remarks : "",
    status: gpWiseKpi ? gpWiseKpi.status : "",
    submitteed_id: gpWiseKpi ? gpWiseKpi.submitteed_id : "",
    created_by: gpWiseKpi ? gpWiseKpi.created_by : "",
    modified_by: gpWiseKpi ? gpWiseKpi.modified_by : "",
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
        <DialogTitle>{type === "add" ? "Add GP-wise KPI" : "Update GP-wise KPI"}</DialogTitle>
        <DialogDescription>
          {type === "add" ? "Add a new GP-wise KPI" : "Update GP-wise KPI details"}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 gap-4">
          <Label htmlFor="state_id" className="text-right mt-2">
            State ID
          </Label>
          <Input
            type="text"
            name="state_id"
            value={formData.state_id}
            onChange={handleChange}
            id="state_id"
            placeholder="Enter State ID"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Label htmlFor="district_id" className="text-right mt-2">
            District ID
          </Label>
          <Input
            type="text"
            name="district_id"
            value={formData.district_id}
            onChange={handleChange}
            id="district_id"
            placeholder="Enter District ID"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Label htmlFor="taluk_id" className="text-right mt-2">
            Taluk ID
          </Label>
          <Input
            type="text"
            name="taluk_id"
            value={formData.taluk_id}
            onChange={handleChange}
            id="taluk_id"
            placeholder="Enter Taluk ID"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Label htmlFor="gp_id" className="text-right mt-2">
            GP ID
          </Label>
          <Input
            type="text"
            name="gp_id"
            value={formData.gp_id}
            onChange={handleChange}
            id="gp_id"
            placeholder="Enter GP ID"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Label htmlFor="date" className="text-right mt-2">
            Date
          </Label>
          <Input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            id="date"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Label htmlFor="theme_id" className="text-right mt-2">
            Theme ID
          </Label>
          <Input
            type="text"
            name="theme_id"
            value={formData.theme_id}
            onChange={handleChange}
            id="theme_id"
            placeholder="Enter Theme ID"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Label htmlFor="kpi_id" className="text-right mt-2">
            KPI ID
          </Label>
          <Input
            type="text"
            name="kpi_id"
            value={formData.kpi_id}
            onChange={handleChange}
            id="kpi_id"
            placeholder="Enter KPI ID"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Label htmlFor="question_id" className="text-right mt-2">
            Question ID
          </Label>
          <Input
            type="text"
            name="question_id"
            value={formData.question_id}
            onChange={handleChange}
            id="question_id"
            placeholder="Enter Question ID"
            className="col-span-3"
          />
        </div>
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
          <Label htmlFor="input_data" className="text-right mt-2">
            Input Data
          </Label>
          <Input
            type="number"
            name="input_data"
            value={formData.input_data}
            onChange={handleChange}
            id="input_data"
            placeholder="Enter Input Data"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Label htmlFor="remarks" className="text-right mt-2">
            Remarks
          </Label>
          <Input
            type="text"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            id="remarks"
            placeholder="Enter Remarks"
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
          <Label htmlFor="submitteed_id" className="text-right mt-2">
            Submitted ID
          </Label>
          <Input
            type="text"
            name="submitteed_id"
            value={formData.submitteed_id}
            onChange={handleChange}
            id="submitteed_id"
            placeholder="Enter Submitted ID"
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
      </div>
      <DialogFooter>
        <Button pending={pending} type="submit">
          {type === "add" ? "Add GP-wise KPI" : "Update GP-wise KPI"}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default GpWiseKpiForm;
