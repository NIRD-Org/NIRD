import React, { useState } from "react";
import { DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function StateForm({ type, onSubmit, state }) {
  const [formData, setFormData] = useState({
    id: state ? state.id : "",
    lgd_code: state ? state.lgd_code : "",
    name: state ? state.name : "",
    status: state ? state.status : "",
    created_by: state ? state.created_by : "",
    modified_by: state ? state.modified_by : "",
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
        <DialogTitle>{type === "add" ? "Add State" : "Update State"}</DialogTitle>
        <DialogDescription>
          {type === "add" ? "Add a new state" : "Update state details"}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 gap-4">
          <Label htmlFor="lgd_code" className="text-right mt-2">
            LGD Code
          </Label>
          <Input
            type="text"
            name="lgd_code"
            value={formData.lgd_code}
            onChange={handleChange}
            id="lgd_code"
            placeholder="Enter LGD Code"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Label htmlFor="name" className="text-right mt-2">
            Name
          </Label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            id="name"
            placeholder="Enter Name"
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
          {type === "add" ? "Add State" : "Update State"}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default StateForm;
