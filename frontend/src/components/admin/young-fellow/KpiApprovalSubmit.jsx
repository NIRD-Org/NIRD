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

function KpiApprovalSubmit() {
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

  useEffect(() => {
    let kpis;
    const fetchKpis = async () => {
      try {
        const response = await API.get(`/api/v1/kpi/theme/${theme_id}`);
        kpis = response.data.KPI;
        console.log(kpis);
        setKpis(kpis);
        console.log(kpis);
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
  }, [theme_id]);

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
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-10 text-center bg-slate-100 py-3">Young Fellow - KPI Entry Form</h2>
        </div>
        <YfLayout />
        <form onSubmit={handleSubmit} className="overflow-x-auto  mt-6">
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
                  <TableHead className="w-40 ">Remarks</TableHead>
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
                      <Input disabled type="number" name="max_range" value={formData[index]?.max_range || ""} onChange={e => handleChange(e, index)} />
                    </TableCell>
                    <TableCell>
                      <Input disabled required type="number" name="input_data" value={formData[index]?.input_data || ""} onChange={e => handleChange(e, index)} />
                    </TableCell>
                    <TableCell>
                      <Input disabled type="number" name="score" value={formData[index]?.score || ""} onChange={e => handleChange(e, index)} />
                    </TableCell>
                    <TableCell>
                      <Textarea disabled type="text" name="remarks" value={formData[index]?.remarks || ""} onChange={e => handleChange(e, index)} />
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
            <Input type="date" name="date" value={date || ""} onChange={e => setDate(e.target.value)} id="date" placeholder="Enter datte" className="px-10" />
          </div>
          <div className="mt-8 flex  gap-4">
            <div className="w-max my-4">
              <Label htmlFor="decision" className="mb-2 block">
                Decision
              </Label>
              <select className="px-4 py-2 rounded-md bg-white " id="decision" name="decision" value={formData.decision || ""} onChange={e => setFormData(prevData => ({ ...prevData, decision: e.target.value }))}>
                {
                  <option value="" disabled>
                    Select
                  </option>
                }
                <option value="approve">Approve</option>
                <option value="send for modification">Send for Modification</option>
              </select>
            </div>
            <div>
              <Label htmlFor="decision" className="mb-2 block">
                Remark
              </Label>
              <Textarea className="w-80" type="text" name="remarks" />
            </div>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}

const ScoreRules = ({ score_rules }) => {
  const rulesArray = score_rules.split("\n");

  return (
    <div>
      {rulesArray.map((rule, index) => (
        <div key={index}>{rule}</div>
      ))}
    </div>
  );
};

export default KpiApprovalSubmit;