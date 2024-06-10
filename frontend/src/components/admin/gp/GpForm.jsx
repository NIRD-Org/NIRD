import React, { useEffect, useState } from "react";
import { DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import API from "@/utils/API";

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
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [taluks, setTaluks] = useState([]);
  const [pending, setPending] = useState(false);

  const getAllStates = async () => {
    const { data } = await API.get(`/api/v1/state/all`);
    setStates(data?.states);
  };

  const getAllDistricts = async () => {
    const { data } = await API.get(`/api/v1/dist/state/${formData.state_id}`);
    setDistricts(data?.districts);
  };

  const getAllTaluks = async () => {
    try {
      const url = `/api/v1/taluk/get?state=${formData.state_id}&dist=${formData.dist_id}`;
      const { data } = await API.get(url);
      setTaluks(data?.taluks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllStates();
  }, []);

  useEffect(() => {
    getAllDistricts();
  }, [formData.state_id]);

  useEffect(() => {
    getAllTaluks();
  }, [formData.dist_id]);

  /*  useState(() => {
    getAllGp();
  }, [formData.taluk_id]);
 */
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
          <Label htmlFor="dist_id" className="text-right mt-2">
            District
          </Label>
          <select
            className="w-full col-span-3 px-4 py-2 rounded-md bg-transparent border"
            value={formData.dist_id}
            onChange={e => setFormData(prevData => ({ ...prevData, dist_id: e.target.value }))}
          >
            <option value="" disabled>
              Select a district
            </option>
            {districts?.map(district => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Label htmlFor="taluk_id" className="text-right mt-2">
            Taluk
          </Label>
          <select
            className="w-full col-span-3 px-4 py-2 rounded-md bg-transparent border"
            value={formData.taluk_id}
            onChange={e => setFormData(prevData => ({ ...prevData, taluk_id: e.target.value }))}
          >
            <option value="" disabled>
              Select a taluk
            </option>
            {taluks?.map(taluk => (
              <option key={taluk.id} value={taluk.id}>
                {taluk.name}
              </option>
            ))}
          </select>
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
