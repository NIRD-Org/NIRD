import React, { useEffect, useState } from "react";
import { DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import API from "@/utils/API";

function DistrictForm({ type, onSubmit, district }) {

  const [formData, setFormData] = useState({
    id: district ? district.id : "",
    lgd_code: district ? district.lgd_code : "",
    state_id: district ? district.state_id : "",
    name: district ? district.name : "",
    special_area: district ? district.special_area : "",
    special_area_id: district ? district.special_area_id : "",
    aspirational_district: district ? district.aspirational_district : "",
    status: district ? district.status : "",
    created_by: district ? district.created_by : "",
    modified_by: district ? district.modified_by : "",
  });
  const [states, setStates] = useState()
  const [pending, setPending] = useState(false);

  const getAllStates = async () => {
    const { data } = await API.get(`/api/v1/state/all`);
    setStates(data?.states);
  };

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

  useEffect(()=>{
    getAllStates()
  },[])

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>{type === "add" ? "Add District" : "Update District"}</DialogTitle>
        <DialogDescription>
          {type === "add" ? "Add a new district" : "Update district details"}
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
          <select
            className="w-full col-span-3 px-4 py-2 rounded-md bg-transparent border"
            value={formData.state_id}
            onChange={e => setFormData(prevData => ({ ...prevData, state_id: e.target.value }))}
          >
            <option value="" disabled>
              Select a state
            </option>
            {states?.map(state => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
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
          <Label htmlFor="special_area" className="text-right mt-2">
            Special Area
          </Label>
          <Input
            type="text"
            name="special_area"
            value={formData.special_area}
            onChange={handleChange}
            id="special_area"
            placeholder="Enter Special Area"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Label htmlFor="special_area_id" className="text-right mt-2">
            Special Area ID
          </Label>
          <Input
            type="text"
            name="special_area_id"
            value={formData.special_area_id}
            onChange={handleChange}
            id="special_area_id"
            placeholder="Enter Special Area ID"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Label htmlFor="aspirational_district" className="text-right mt-2">
            Aspirational District
          </Label>
          <Input
            type="text"
            name="aspirational_district"
            value={formData.aspirational_district}
            onChange={handleChange}
            id="aspirational_district"
            placeholder="Enter Aspirational District"
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
          {type === "add" ? "Add District" : "Update District"}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default DistrictForm;
