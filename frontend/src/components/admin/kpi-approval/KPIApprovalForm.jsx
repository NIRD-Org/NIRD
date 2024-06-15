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
import API from "@/utils/API";

function KPIApprovalForm({ type, onSubmit, kpiApproval }) {
  const [formData, setFormData] = useState({
    id: kpiApproval ? kpiApproval.id : "",
    state_id: kpiApproval ? kpiApproval.state_id : "",
    district_id: kpiApproval ? kpiApproval.district_id : "",
    block_id: kpiApproval ? kpiApproval.block_id : "",
    gp_id: kpiApproval ? kpiApproval.gp_id : "",
    theme_id: kpiApproval ? kpiApproval.theme_id : "",
    decision: kpiApproval ? kpiApproval.decision : "",
    submitted_id: kpiApproval ? kpiApproval.submitted_id : "",
    remarks: kpiApproval ? kpiApproval.remarks : "",
  });

  const [pending, setPending] = useState(false);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [blocks, setblocks] = useState([]);
  const [themes, setThemes] = useState([]);
  const [gps, setGps] = useState([]);

  const getAllStates = async () => {
    const { data } = await API.get(`/api/v1/state/all`);
    setStates(data?.states);
  };

  const getAllDistricts = async () => {
    const { data } = await API.get(`/api/v1/dist/state/${formData.state_id}`);
    setDistricts(data?.districts);
  };

  const getAllblocks = async () => {
    try {
      const url = `/api/v1/block/get?state=${formData.state_id}&dist=${formData.dist_id}`;
      const { data } = await API.get(url);
      setblocks(data?.blocks);
    } catch (error) {}
  };

  const getAllGp = async () => {
    try {
      const { data } = await API.get(
        `/api/v1/gram/get?dist=${formData.dist_id}&state=${formData.state_id}&block=${formData.block_id}`
      );
      setGps(data?.gram);
    } catch (error) {}
  };

  const getAllThemes = async () => {
    const { data } = await API.get(`/api/v1/theme/all`);
    setThemes(data?.themes);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    getAllStates();
    getAllThemes();
  }, []);

  useEffect(() => {
    getAllDistricts();
  }, [formData.state_id]);

  useEffect(() => {
    getAllblocks();
    getAllGp();
  }, [formData.dist_id]);

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
          {type === "add" ? "Add KPI Approval" : "Update KPI Approval"}
        </DialogTitle>
        <DialogDescription>
          {type === "add"
            ? "Add a new KPI approval"
            : "Update KPI approval details"}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 gap-4">
          <Label htmlFor="state_id" className="text-right mt-2">
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
              Select a district
            </option>
            {districts?.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Label htmlFor="block_id" className="text-right mt-2">
            Block
          </Label>
          <select
            className="w-full col-span-3 px-4 py-2 rounded-md bg-transparent border"
            value={formData.block_id}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                block_id: e.target.value,
              }))
            }
          >
            <option value="" disabled>
              Select a Block
            </option>
            {blocks?.map((block) => (
              <option key={block.id} value={block.id}>
                {block.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Label htmlFor="gp_id" className="text-right mt-2">
            GP
          </Label>
          <select
            className="w-full col-span-3 px-4 py-2 rounded-md bg-transparent border"
            value={formData.gp_id}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                gp_id: e.target.value,
              }))
            }
          >
            <option value="" disabled>
              Select a GP
            </option>
            {gps?.map((gp) => (
              <option key={gp.id} value={gp.id}>
                {gp.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Label htmlFor="themes_id" className="text-right mt-2">
            Themes
          </Label>
          <select
            className="w-full col-span-3 px-4 py-2 rounded-md bg-transparent border"
            value={formData.theme_id}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                theme_id: e.target.value,
              }))
            }
          >
            <option value="" disabled>
              Select a Theme
            </option>
            {themes?.map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.theme_name}
              </option>
            ))}
          </select>
        </div>
        {[
          "decision",
          "submitted_id",
          "remarks",
          "status",
          "created_by",
          "modified_by",
        ].map((field) => (
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
