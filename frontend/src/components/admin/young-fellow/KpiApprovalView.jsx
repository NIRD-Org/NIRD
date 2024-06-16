import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import API from "@/utils/API";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import YfLayout from "./YfLayout";
import { kpiApprovals } from "@/lib/data";

function KpiApprovalView() {
  const [searchParams] = useSearchParams();
  const theme_id = searchParams.get("theme_id") || "";
  const [kpiApprovalData, setKpiApprovalData] = useState([]);
  const state_id = searchParams.get("state_id") || "";
  const dist_id = searchParams.get("dist_id") || "";
  const block_id = searchParams.get("block_id") || "";
  const gp_id = searchParams.get("gram_id") || "";
  const date = searchParams.get("date") || "";

  useEffect(() => {
    const fetchKpiApprovalData = async () => {
      try {
        const url = `/api/v1/gp-wise-kpi/approval-data?gp=${gp_id}&theme=${theme_id}&date=${new Date(date).toISOString().replace(/Z$/, '+00:00')}`;
        const response = await API.get(url);
        setKpiApprovalData(response.data.data || []);
      } catch (error) {
        console.log(error)
      }
    };
    fetchKpiApprovalData();
  }, []);

  return (
    <div className="w-full">
      <div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-10 text-center bg-slate-100 py-3">Young Fellow - KPI Entry Form</h2>
        </div>
        <YfLayout />
        <form className="overflow-x-auto  mt-6">
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">ID</TableHead>
                  <TableHead className="w-[200px]">KPI Name</TableHead>
                  <TableHead className="w-[200px]">Data point</TableHead>
                  {/* <TableHead className="w-20"></TableHead> */}
                  <TableHead className="w-32">Max Number </TableHead>
                  <TableHead className="w-20">Achieved Number</TableHead>
                  {/* <TableHead className="w-40">Score</TableHead> */}
                  <TableHead className="w-40 ">Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {kpiApprovalData.map((data, index) => (
                  <TableRow key={data.id}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{data?.kpiDetails.name}</TableCell>
                    <TableCell>{data.kpiDetails.kpi_datapoint || "No question"}</TableCell>
                    {/* <TableCell>{data?.kpiDetails.input_type}</TableCell> */}
                    <TableCell>
                      <Input value={data?.max_range} disabled />
                    </TableCell>
                    <TableCell>
                      <Input  value={data?.input_data} type="number" disabled />
                    </TableCell>
                    <TableCell>
                      <Input value={data?.remarks} disabled type="number" />
                    </TableCell>
                    {/* <TableCell>
                      <Input disabled type="text" />
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="w-max my-4">
            <Label htmlFor="date" className="text-right mt-2">
              Date
            </Label>
            <Input disabled value={kpiApprovalData[0]?.date} type="date" name="date" onChange={e => setDate(e.target.value)} id="date" placeholder="Enter datte" className="px-10" />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}

export default KpiApprovalView;
