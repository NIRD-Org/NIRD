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
import { districts, states } from "@/lib/data";
function TalukForm({ type, onSubmit, taluk }) {
  const [formData, setFormData] = useState({
    id: taluk ? taluk.id : "",
    state_id: taluk ? taluk.state_id : "",
    dist_id: taluk ? taluk.dist_id : "",
    lgd_code: taluk ? taluk.lgd_code : "",
    lgd_code_feb11_2021: taluk ? taluk.lgd_code_feb11_2021 : "",
    name: taluk ? taluk.name : "",
    is_maped_to_another_district: taluk ? taluk.is_maped_to_another_district : "",
    status: taluk ? taluk.status : "",
    created_by: taluk ? taluk.created_by : "",
    modified_by: taluk ? taluk.modified_by : "",
  });

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

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
        <DialogTitle>{type === "add" ? "Add Taluk" : "Update Taluk"}</DialogTitle>
        <DialogDescription>
          {type === "add" ? "Add a new taluk" : "Update taluk details"}
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
          <Label htmlFor="dist_id" className="text-right mt-2">
            State
          </Label>
          <Select
            className="w-full"
            value={formData.dist_id}
            onValueChange={value =>
              setFormData(prevData => ({
                ...prevData,
                dist_id: value,
              }))
            }
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select a state" />
            </SelectTrigger>
            <SelectContent>
              {states?.map(states => (
                <SelectItem key={states.id} value={states.name}>
                  {states.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Label htmlFor="state_id" className="text-right mt-2">
            District
          </Label>
          <Select
            className="w-full"
            value={formData.dist_id}
            onValueChange={value =>
              setFormData(prevData => ({
                ...prevData,
                dist_id: value,
              }))
            }
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select a district" />
            </SelectTrigger>
            <SelectContent>
              {districts?.map(districts => (
                <SelectItem key={districts.id} value={districts.name}>
                  {districts.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
          <Label htmlFor="is_maped_to_another_district" className="text-right mt-2">
            Mapped to Another District
          </Label>
          <Input
            type="text"
            name="is_maped_to_another_district"
            value={formData.is_maped_to_another_district}
            onChange={handleChange}
            id="is_maped_to_another_district"
            placeholder="Enter Mapping Status"
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
          {type === "add" ? "Add Taluk" : "Update Taluk"}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default TalukForm;
