import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import API from "@/utils/API";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import YfLayout from "./YfLayout";

function KpiApprovalView() {
  const [searchParams] = useSearchParams();
  const theme_id = searchParams.get("theme_id") || "";
  const [kpis, setKpis] = useState([]);

  useEffect(() => {
    const fetchKpis = async () => {
      try {
        const response = await API.get(`/api/v1/gp-wise-approval/approval-data?theme=${theme_id}&gp=${gp}&date=${date}`);
        setKpis(response.data.KPI);
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


  return (
    <div className="w-full">
      <div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-10 text-center bg-slate-100 py-3">Young Fellow - KPI Entry Form</h2>
        </div>
        <YfLayout/>
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
                      <Input type="number" disabled />
                    </TableCell>
                    <TableCell>
                      <Input required type="number" disabled={index % 2 === 0} />
                    </TableCell>
                    <TableCell>
                      <Input disabled type="number" />
                    </TableCell>
                    <TableCell>
                      <Input disabled type="text" />
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
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}


export default KpiApprovalView;

