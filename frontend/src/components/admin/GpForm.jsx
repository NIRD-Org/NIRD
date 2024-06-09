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
import { districts, states, taluks } from "@/lib/data";

function GpForm({ type, onSubmit, gp }) {
  const [formData, setFormData] = useState({
    id: gp ? gp.id : "",
    state_id: gp ? gp.state_id : "",
    dist_id: gp ? gp.dist_id : "",
    taluk_id: gp ? gp.taluk_id : "",
    lgd_code: gp ? gp.lgd_code : "",
    lgd_code_feb11_2021: gp ? gp.lgd_code_feb11_2021 : "",
    name: gp ? gp.name : "",
    is_maped_to_another_district: gp ? gp.is_maped_to_another_district : "",
    status: gp ? gp.status : "",
    created_by: gp ? gp.created_by : "",
    modified_by: gp ? gp.modified_by : "",
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
        <DialogTitle>{type === "add" ? "Add Gram Panchayat" : "Update Gram Panchayat"}</DialogTitle>
        <DialogDescription>
          {type === "add" ? "Add a new Gram Panchayat" : "Update Gram Panchayat details"}
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
          <Label htmlFor="state_id" className="text-right mt-2">
            State
          </Label>
          <Select
            className="w-full"
            value={formData.state_id}
            onValueChange={value =>
              setFormData(prevData => ({
                ...prevData,
                state_id: value,
              }))
            }
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select a state" />
            </SelectTrigger>
            <SelectContent>
              {states?.map(state => (
                <SelectItem key={state.id} value={state.id}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Label htmlFor="dist_id" className="text-right mt-2">
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
              {districts?.map(district => (
                <SelectItem key={district.id} value={district.id}>
                  {district.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Similar structure for other form fields */}
        <div className="grid grid-cols-4 gap-4">
          <Label htmlFor="taluk_id" className="text-right mt-2">
            Taluk
          </Label>
          <Select
            className="w-full"
            value={formData.taluk_id}
            onValueChange={value =>
              setFormData(prevData => ({
                ...prevData,
                taluk_id: value,
              }))
            }
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select a taluk" />
            </SelectTrigger>
            <SelectContent>
              {taluks?.map(taluk => (
                <SelectItem key={taluk.id} value={taluk.id}>
                  {taluk.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Label htmlFor="lgd_code_feb11_2021" className="text-right mt-2">
            LGD Code (Feb 11, 2021)
          </Label>
          <Input
            type="text"
            name="lgd_code_feb11_2021"
            value={formData.lgd_code_feb11_2021}
            onChange={handleChange}
            id="lgd_code_feb11_2021"
            placeholder="Enter LGD Code (Feb 11, 2021)"
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
          {type === "add" ? "Add Gram Panchayat" : "Update Gram Panchayat"}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default GpForm;
