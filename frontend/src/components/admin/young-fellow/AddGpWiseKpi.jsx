import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useAuthContext } from "@/context/AuthContext";
import { tst } from "@/lib/utils";
import API from "@/utils/API";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import YfLayout from "./YfLayout";

function AddGpWiseKpi() {
  const [searchParams, setSearchParams] = useSearchParams();
  const state_id = searchParams.get("state_id") || "";
  const dist_id = searchParams.get("dist_id") || "";
  const block_id = searchParams.get("block_id") || "";
  const gp_id = searchParams.get("gram_id") || "";
  const theme_id = searchParams.get("theme_id") || "";

  const [kpis, setKpis] = useState([]);
  const [formData, setFormData] = useState([]);
  const [date, setDate] = useState(null);
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const [stateName, setStateName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [blockName, setBlockName] = useState("");
  const [gpName, setGpName] = useState("");
  const [themeName, setThemeName] = useState("");

  useEffect(() => {
    const fetchKpis = async () => {
      try {
        const response = await API.get(`/api/v1/kpi/theme/${theme_id}`);
        const kpis = response.data.KPI;
        setKpis(kpis);
      } catch (error) {
        console.error("Error fetching KPIs:", error);
      }
    };

    const fetchNames = async () => {
      try {
        const stateResponse = await API.get(`/api/v1/state/${state_id}`);
        setStateName(stateResponse.data.name);

        const districtResponse = await API.get(`/api/v1/district/${dist_id}`);
        setDistrictName(districtResponse.data.name);

        const blockResponse = await API.get(`/api/v1/block/${block_id}`);
        setBlockName(blockResponse.data.name);

        const gpResponse = await API.get(`/api/v1/gp/${gp_id}`);
        setGpName(gpResponse.data.name);

        const themeResponse = await API.get(`/api/v1/theme/${theme_id}`);
        setThemeName(themeResponse.data.name);
      } catch (error) {
        console.error("Error fetching names:", error);
      }
    };

    const run = async () => {
      setIsLoading(true);
      await fetchKpis();
      await fetchNames();
      setIsLoading(false);
    };

    run();
  }, [theme_id, state_id, dist_id, block_id, gp_id]);

  const calculateScore = (percentage, thresholds, scores) => {
    for (let i = 0; i < thresholds.length; i++) {
      if (percentage > thresholds[i]) {
        return scores[i];
      }
    }
    return scores[thresholds.length];
  };

  const kpiScoringRules = {
    1: { thresholds: [80, 60, 40, 20], scores: [10, 8, 6, 4, 2] },
    2: { thresholds: [80, 60, 40, 20], scores: [5, 4, 3, 2, 1] },
    3: { thresholds: [80, 60, 40, 20], scores: [10, 8, 6, 4, 2] },
    4: { thresholds: [80, 60, 40, 20], scores: [10, 8, 6, 4, 2] },
    5: { thresholds: [80, 60, 40, 20], scores: [5, 4, 3, 2, 1] },
    6: { thresholds: [80, 60, 40, 20], scores: [10, 8, 6, 4, 2] },
    7: { thresholds: [80, 60, 40, 20], scores: [10, 8, 6, 4, 2] },
    8: { thresholds: [80, 60, 40, 20], scores: [4, 3, 2, 1, 0] },
    9: { thresholds: [80, 60, 40, 20], scores: [6, 5, 4, 3, 2] },
    10: { thresholds: [80, 60, 40, 20], scores: [10, 8, 6, 4, 2] },
    11: { thresholds: [80, 60, 40, 20], scores: [10, 8, 6, 4, 2] },
    12: { thresholds: [80, 60, 40, 20], scores: [10, 8, 6, 4, 2] },
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setFormData(prevData => {
      const updatedData = [...prevData];
      updatedData[index] = {
        ...updatedData[index],
        [name]: value,
      };

      if (name === 'max_range' || name === 'input_data') {
        const maxRange = updatedData[index].max_range || 0;
        const inputData = updatedData[index].input_data || 0;
        const percentage = (inputData / maxRange) * 100;

        const kpiId = kpis[index].id;
        const { thresholds, scores } = kpiScoringRules[kpiId];
        updatedData[index].score = calculateScore(percentage, thresholds, scores);
      }

      return updatedData;
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    let updatedFormData = kpis.map((item, index) => {
      return {
        ...formData[index],
        kpi_id: item.id,
        max_range: item.max_range,
      };
    });

    const dataToSend = {
      state_id,
      dist_id,
      block_id,
      gp_id,
      theme_id,
      user_id: user.id,
      date: date,
      theme_id,
      formData: updatedFormData,
    };

    try {
      const response = await API.post("/api/v1/gp-wise-kpi/submit", dataToSend);
      console.log("Success:", response.data);
      tst.success("Form submitted successfully");
    } catch (error) {
      tst.error(error);
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="w-full">
      <div>
        <div className="mb-2 text-center">
          <h2 className="text-xl font-semibold mb-10 bg-slate-100 py-3">Young Fellow - LSG _ Theme wise KPI Entry Form</h2>
        </div>
        <YfLayout/>
        <form onSubmit={handleSubmit} className="overflow-x-auto mt-10">
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">ID</TableHead>
                  <TableHead className="w-[200px]">KPI Name</TableHead>
                  <TableHead className="w-[200px]">Data point</TableHead>
                  <TableHead className="w-20">Input type</TableHead>
                  <TableHead className="w-32">Max Number (Total Number)</TableHead>
                  <TableHead className="w-20">Cumulative Achived Number</TableHead>
                  <TableHead className="w-40">Score</TableHead>
                  <TableHead className="w-40">Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {kpis.map((data, index) => (
                  <TableRow key={data.id}>
                    <TableCell>{data.id}</TableCell>
                    <TableCell>{data.name}</TableCell>
                    <TableCell>{data.kpi_datapoint || "No question"}</TableCell>
                    <TableCell>{data?.input_type}</TableCell>
                    <TableCell>
                      <Input type="number" name="max_range" value={formData[index]?.max_range || ""} onChange={e => handleChange(e, index)} />
                    </TableCell>
                    <TableCell>
                      <Input required type="number" name="input_data" value={formData[index]?.input_data || ""} onChange={e => handleChange(e, index)} />
                    </TableCell>
                    <TableCell>
                      <Input disabled type="number" name="score" value={formData[index]?.score || ""} onChange={e => handleChange(e, index)} />
                    </TableCell>
                    <TableCell>
                      <Textarea type="text" name="remarks" value={formData[index]?.remarks || ""} onChange={e => handleChange(e, index)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="w-max my-4">
            <Label htmlFor="date" className="text-right mt-2">
              Date
            </Label>
            <Input type="date" name="date" value={date || ""} onChange={e => setDate(e.target.value)} id="date" placeholder="Enter date" className="px-10" />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}

export default AddGpWiseKpi;