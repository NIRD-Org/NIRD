import React, { useEffect, useState } from "react";
import {
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
import API from "@/utils/API";

function BlockForm({ type, onSubmit, block }) {
  const [formData, setFormData] = useState({
    id: block ? block.id : "",
    state_id: block ? block.state_id : "",
    dist_id: block ? block.dist_id : "",
    lgd_code: block ? block.lgd_code : "",
    lgd_code_feb11_2021: block ? block.lgd_code_feb11_2021 : "",
    name: block ? block.name : "",
    is_maped_to_another_district: block
      ? block.is_maped_to_another_district
      : "",
    status: block ? block.status : "",
    created_by: block ? block.created_by : "",
    modified_by: block ? block.modified_by : "",
  });

  const [pending, setPending] = useState(false);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);

  const getAllStates = async () => {
    const { data } = await API.get(`/api/v1/state/all`);
    setStates(data?.states);
    console.log(data?.states);
  };

  const getAllDistricts = async (s) => {
    const { data } = await API.get(`/api/v1/dist/state/${formData.state_id}`);
    setDistricts(data?.districts);
    console.log(data?.districts);
  };

  useEffect(() => {
    getAllStates();
  }, []);

  useEffect(() => {
    getAllDistricts();
  }, [formData.state_id]);

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
        <DialogTitle>
          {type === "add" ? "Add block" : "Update block"}
        </DialogTitle>
        <DialogDescription>
          {type === "add" ? "Add a new block" : "Update block details"}
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
          <select
            className="w-full col-span-3 px-4 py-2 rounded-md bg-transparent border"
            value={formData.state_id}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                state_id: e.target.value,
              }))
            }
          >
            <option value="" disabled>
              Select a state
            </option>
            {states?.map((state) => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Label htmlFor="dist_id" className="text-right mt-2">
            District
          </Label>
          <select
            className="w-full col-span-3 px-4 py-2 rounded-md bg-transparent border"
            value={formData.dist_id}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                dist_id: e.target.value,
              }))
            }
          >
            <option value="" disabled>
              Select a District
            </option>
            {districts?.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
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
          <Label
            htmlFor="is_maped_to_another_district"
            className="text-right mt-2"
          >
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
          {type === "add" ? "Add block" : "Update block"}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default BlockForm;
