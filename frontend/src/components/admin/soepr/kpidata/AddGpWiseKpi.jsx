import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useAuthContext } from "@/context/AuthContext";
import { tst } from "@/lib/utils";
import API from "@/utils/API";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import YfLayout from "../../young-fellow/YfLayout";
import { kpiScoringRules } from "@/lib/data";
import { disabledKpis } from "@/lib/data";

function SoeprAddGpWiseKpi({ update }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const state_id = searchParams.get("state_id") || "";
  const dist_id = searchParams.get("dist_id") || "";
  const block_id = searchParams.get("block_id") || "";
  const gp_id = searchParams.get("gram_id") || "";
  const theme_id = searchParams.get("theme_id") || "";
  const navigate = useNavigate();
  const [kpis, setKpis] = useState([]);
  const [formData, setFormData] = useState([]);
  const [date, setDate] = useState(null);
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [financialYear, setFinancialYear] = useState("");
  const [frequency, setFrequency] = useState("");
  const [month, setMonth] = useState("");
  const [quarter, setQuarter] = useState("");
  const [state, setState] = useState({});
  const [theme, setTheme] = useState({});

  useEffect(() => {
    const fetchKpis = async () => {
      try {
        const response = await API.get(`/api/v1/soepr-kpi/theme/${theme_id}`);
        const kpis = response.data.KPI;
        setKpis(kpis);
      } catch (error) {
        console.error("Error fetching KPIs:", error);
      }
    };

    const run = async () => {
      setIsLoading(true);
      await fetchKpis();
      setIsLoading(false);
    };

    run();
  }, [theme_id, state_id]);

  const calculateScore = (percentage, thresholds, scores) => {
    for (let i = 0; i < thresholds.length; i++) {
      if (percentage > thresholds[i]) {
        return scores[i];
      }
    }
    return scores[thresholds.length];
  };

  const booleanKpiScoringRules = {
    100: { yesScore: 5, noScore: 0 },
    101: { yesScore: 10, noScore: 0 },
    102: { yesScore: 6, noScore: 0 },
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setFormData(prevData => {
      const updatedData = [...prevData];
      updatedData[index] = {
        ...updatedData[index],
        [name]: value,
      };
      return updatedData;
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    let updatedFormData = kpis.map((item, index) => {
      return {
        ...formData[index],
        kpi_id: item.id,
      };
    });

    const dataToSend = {
      state_id,
      financial_year: financialYear,
      frequency,
      month,
      quarter,
      user_id: user.id,
      date: date,
      theme_id,
      formData: updatedFormData,
    };

    try {
      const response = await API.post("/api/v1/soepr-kpi-data/submit", dataToSend);
      console.log("Success:", response.data);
      tst.success("Form submitted successfully");
      navigate("/admin/soepr/young-professionals");
    } catch (error) {
      tst.error(error);
      console.error("Error submitting data:", error);
    }
  };

  const getState = async () => {
    try {
      const { data } = await API.get(`/api/v1/state/get-state/${state_id}`);
      setState(data?.state);
      console.log(state);
    } catch (error) {
      console.log(error);
    }
  };

  const getTheme = async () => {
    try {
      const { data } = await API.get(`/api/v1/soepr-theme/get-theme/${theme_id}`);
      setTheme(data?.theme);
      console.log(theme);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (state_id && theme_id) {
      getState();
      getTheme();
    }
  }, [state_id, theme_id]);

  return (
    <div className="w-full">
      <div>
        <div className="mb-2 text-center">
          <h2 className="text-xl font-semibold mb-10 bg-slate-100 py-3">
          SoEPR -  Theme wise KPI Entry Form
          </h2>
        </div>
        <div className="flex justify-around py-6 items-center ">
          {/* <h1 className="text-2xl font-bold">Gram Panchayat wise KPI</h1> */}
          <h2>Theme : {theme?.theme_name}</h2>
        </div>
        <form onSubmit={handleSubmit} className="overflow-x-auto mt-10">
          <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="mb-4">
              <Label htmlFor="financialYear">Financial Year</Label>
              <select
                id="financialYear"
                name="financialYear"
                value={financialYear}
                onChange={e => setFinancialYear(e.target.value)}
                className="text-sm px-4 py-2 rounded-md bg-transparent border w-full"
              >
                <option value="">Select Financial Year</option>
                {Array.from({ length: 30 }, (_, i) => {
                  const startYear = 2021 + i;
                  const endYear = startYear + 1;
                  return (
                    <option key={i} value={`FY${startYear}-${endYear}`}>
                      FY{startYear}-{endYear}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="mb-4">
              <Label htmlFor="frequency">Frequency</Label>
              <select
                id="frequency"
                name="frequency"
                value={frequency}
                onChange={e => setFrequency(e.target.value)}
                className="text-sm px-4 py-2 rounded-md bg-transparent border w-full"
              >
                <option value="">Select Frequency</option>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
              </select>
            </div>

            {frequency === "Monthly" && (
              <div className="mb-4">
                <Label htmlFor="month">Month</Label>
                <select
                  id="month"
                  name="month"
                  value={month}
                  onChange={e => setMonth(e.target.value)}
                  className="text-sm px-4 py-2 rounded-md bg-transparent border w-full"
                >
                  <option value="">Select Month</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
              </div>
            )}

            {frequency === "Quarterly" && (
              <div className="mb-4">
                <Label htmlFor="quarter">Quarter</Label>
                <select
                  id="quarter"
                  name="quarter"
                  value={quarter}
                  onChange={e => setQuarter(e.target.value)}
                  className="text-sm px-4 py-2 rounded-md bg-transparent border w-full"
                >
                  <option value="">Select Quarter</option>
                  <option value="Q1">Q1</option>
                  <option value="Q2">Q2</option>
                  <option value="Q3">Q3</option>
                  <option value="Q4">Q4</option>
                </select>
              </div>
            )}
          </div>
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">ID</TableHead>
                  <TableHead className="w-[200px]">KPI Name</TableHead>
                  <TableHead className="w-[200px]">Data point</TableHead>
                  <TableHead className="w-20">Input type</TableHead>
                  <TableHead className="w-40">Max Number (Total Number)</TableHead>
                  <TableHead className="w-40">Cumulative Achieved Number</TableHead>
                  <TableHead className="w-40">Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {kpis.map((data, index) => {
                  const isDisabled = disabledKpis.includes(parseInt(data.id));
                  return (
                    <TableRow key={data.id}>
                      <TableCell>{data.id}</TableCell>
                      <TableCell>{data.name}</TableCell>
                      <TableCell>{data.kpi_datapoint || "No question"}</TableCell>
                      <TableCell>{data?.input_type}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          name="max_range"
                          value={formData[index]?.max_range || ""}
                          onChange={e => handleChange(e, index)}
                        />
                      </TableCell>
                      <TableCell>
                          <Input
                            required
                            max={formData[index]?.max_range}
                            type="number"
                            name="input_data"
                            value={formData[index]?.input_data || ""}
                            onChange={e => handleChange(e, index)}
                          />
                      </TableCell>

                      <TableCell>
                        <Textarea
                          type="text"
                          name="remarks"
                          value={formData[index]?.remarks || ""}
                          onChange={e => handleChange(e, index)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <div className="w-max my-4">
            <Label htmlFor="date" className="text-right mt-2">
              Date
            </Label>
            <Input
              type="date"
              name="date"
              value={date || ""}
              onChange={e => setDate(e.target.value)}
              id="date"
              placeholder="Enter date"
              className="px-10"
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}

export default SoeprAddGpWiseKpi;
