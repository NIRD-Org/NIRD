import React, { useState } from "react";
import { DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function KPIApprovalForm({ type, onSubmit, kpiApproval }) {
  const [formData, setFormData] = useState({
    id: kpiApproval ? kpiApproval.id : "",
    state_id: kpiApproval ? kpiApproval.state_id : "",
    district_id: kpiApproval ? kpiApproval.district_id : "",
    taluk_id: kpiApproval ? kpiApproval.taluk_id : "",
    gp_id: kpiApproval ? kpiApproval.gp_id : "",
    theme_id: kpiApproval ? kpiApproval.theme_id : "",
    decision: kpiApproval ? kpiApproval.decision : "",
    submitted_id: kpiApproval ? kpiApproval.submitted_id : "",
    remarks: kpiApproval ? kpiApproval.remarks : "",
    status: kpiApproval ? kpiApproval.status : "",
    created_by: kpiApproval ? kpiApproval.created_by : "",
    modified_by: kpiApproval ? kpiApproval.modified_by : "",
  });

  const [pending, setPending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPending(true);
    onSubmit(formData);
    setPending(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>{type === "add" ? "Add KPI Approval" : "Update KPI Approval"}</DialogTitle>
        <DialogDescription>
          {type === "add" ? "Add a new KPI approval" : "Update KPI approval details"}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        {["state_id", "district_id", "taluk_id", "gp_id", "theme_id", "decision", "submitted_id", "remarks", "status", "created_by", "modified_by"].map((field) => (
          <div className="grid grid-cols-4 gap-4" key={field}>
            <Label htmlFor={field} className="text-right mt-2">
              {field.replace("_", " ").toUpperCase()}
            </Label>
            <Input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              id={field}
              placeholder={`Enter ${field.replace("_", " ")}`}
              className="col-span-3"
            />
          </div>
        ))}
      </div>
      <DialogFooter>
        <Button pending={pending} type="submit">
          {type === "add" ? "Add KPI Approval" : "Update KPI Approval"}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default KPIApprovalForm;
