import React, { useEffect, useState } from "react";
import { DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import API from "@/utils/API";

function GpWiseKpiForm({ type, onSubmit, gpWiseKpi }) {
  const [formData, setFormData] = useState({
    state_id: gpWiseKpi ? gpWiseKpi.state_id : "",
    dist_id: gpWiseKpi ? gpWiseKpi.dist_id : "",
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
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [taluks, setTaluks] = useState([]);
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

  const getAllThemes = async () => {
    const { data } = await API.get(`/api/v1/theme/all`);
    setThemes(data?.themes);
  };

  const getAllGp = async () => {
    try {
      const { data } = await API.get(
        `/api/v1/gram/get?dist=${formData.dist_id}&state=${formData.state_id}&taluk=${formData.taluk_id}`
      );
      setGps(data?.gram);
    } catch (error) {
      console.log(error);
    }
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

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
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
    getAllTaluks();
    getAllGp();
  }, [formData.dist_id, formData.state_id]);

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
          <Label htmlFor="gp_id" className="text-right mt-2">
            Gram
          </Label>
          <select
            className="w-full col-span-3 px-4 py-2 rounded-md bg-transparent border"
            value={formData.gp_id}
            onChange={e => setFormData(prevData => ({ ...prevData, gp_id: e.target.value }))}
          >
            <option value="" disabled>
              Select a Gram
            </option>
            {gps?.map(gp => (
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
            onChange={e => setFormData(prevData => ({ ...prevData, theme_id: e.target.value }))}
          >
            <option value="" disabled>
              Select a Theme
            </option>
            {themes?.map(theme => (
              <option key={theme.id} value={theme.id}>
                {theme.theme_name}
              </option>
            ))}
          </select>
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
