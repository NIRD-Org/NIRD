import React, { useEffect, useState } from "react";
import { DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import API from "@/utils/API";

function KpiForm({ type, onSubmit, kpiQuestion }) {
  const [formData, setFormData] = useState({
    id: kpiQuestion ? kpiQuestion.id : "",
    theme_id: kpiQuestion ? kpiQuestion.theme_id : "",
    kpi_id: kpiQuestion ? kpiQuestion.kpi_id : "",
    question_name: kpiQuestion ? kpiQuestion.question_name : "",
    input_type: kpiQuestion ? kpiQuestion.input_type : "",
    max_range: kpiQuestion ? kpiQuestion.max_range : "",
    question_type: kpiQuestion ? kpiQuestion.question_type : "",
    status: kpiQuestion ? kpiQuestion.status : "",
    created_by: kpiQuestion ? kpiQuestion.created_by : "",
    modified_by: kpiQuestion ? kpiQuestion.modified_by : "",
  });
  const [themes, setThemes] = useState([]);
  const [kpi, setKpi] = useState([]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(formData);
  };

  const getAllThemes = async () => {
    try {
      const { data } = await API.get(`/api/v1/theme/all`);
      setThemes(data?.themes);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllKpi = async () => {
    try {
      const { data } = await API.get(`/api/v1/kpi/theme/${formData.theme_id}`);
      setKpi(data?.KPI);
    } catch (error) {
    }
  };

  const handleThemeChange = e => {
    setFormData(prevData => ({ ...prevData, theme_id: e.target.value }));
    getAllKpi();
  };

  useEffect(() => {
    getAllThemes();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>{type === "add" ? "Add KPI Question" : "Update KPI Question"}</DialogTitle>
        <DialogDescription>
          {type === "add" ? "Add a new KPI Question" : "Update KPI Question details"}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 gap-4">
          <Label htmlFor="theme_id" className="text-right mt-2">
            Theme ID
          </Label>
          <select
            className="w-full col-span-3 px-4 py-2 rounded-md bg-transparent border"
            value={formData.theme_id}
            onChange={e => handleThemeChange(e)}
          >
            <option value="" disabled>
              Select a theme
            </option>
            {themes?.map(theme => (
              <option key={theme.id} value={theme.id}>
                {theme.theme_name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Label htmlFor="kpi_id" className="text-right mt-2">
            KPI
          </Label>
          <select
            className="w-full col-span-3 px-4 py-2 rounded-md bg-transparent border"
            value={formData.kpi_id}
            onChange={e => setFormData(prevData => ({ ...prevData, kpi_id: e.target.value }))}
          >
            <option value="" disabled>
              Select a kpi
            </option>
            {kpi?.map(kpi => (
              <option key={kpi.id} value={kpi.id}>
                {kpi.kpi_name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Label htmlFor="question_name" className="text-right mt-2">
            Question Name
          </Label>
          <Input
            type="text"
            name="question_name"
            value={formData.question_name}
            onChange={handleChange}
            id="question_name"
            placeholder="Enter Question Name"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Label htmlFor="input_type" className="text-right mt-2">
            Input Type
          </Label>
          <Input
            type="text"
            name="input_type"
            value={formData.input_type}
            onChange={handleChange}
            id="input_type"
            placeholder="Enter Input Type"
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
          <Label htmlFor="question_type" className="text-right mt-2">
            Question Type
          </Label>
          <Input
            type="text"
            name="question_type"
            value={formData.question_type}
            onChange={handleChange}
            id="question_type"
            placeholder="Enter Question Type"
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
        <Button type="submit">{type === "add" ? "Add KPI Question" : "Update KPI Question"}</Button>
      </DialogFooter>
    </form>
  );
}

export default KpiForm;
