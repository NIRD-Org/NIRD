import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import LocationHeader from "../../components/LocationHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams } from "react-router-dom";
import API from "@/utils/API";
import { Textarea } from "@/components/ui/textarea";

function GpWiseKpiView() {
    const [kpiApprovalData, setKpiApprovalData] = useState([]);
    const { id: submitted_id } = useParams();

    useEffect(() => {
        const fetchKpiApprovalData = async () => {
          try {
            const url = `/api/v1/gp-wise-kpi/approval-data?submitted_id=${submitted_id}`;
            const response = await API.get(url);
            setKpiApprovalData(response.data.data || []);
          } catch (error) {
            console.log(error);
          }
        };
        fetchKpiApprovalData();
      }, []);

      
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-10 text-center bg-slate-100 py-3">
          Young Fellow - KPI Entry Form
        </h2>
      </div>
      <LocationHeader
        state_name={kpiApprovalData[0]?.stateDetails?.name}
        dist_name={kpiApprovalData[0]?.districtDetails?.name}
        block_name={kpiApprovalData[0]?.blockDetails?.name}
        gp_name={kpiApprovalData[0]?.gpDetails?.name}
        theme_name={kpiApprovalData[0]?.themeDetails?.theme_name}
      />
      <div className="overflow-x-auto  mt-6">
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">ID</TableHead>
                <TableHead className="w-[200px]">KPI Name</TableHead>
                <TableHead className="w-[200px]">Data point</TableHead>
                <TableHead className="w-32">Max Number </TableHead>
                <TableHead className="w-20">Achieved Number</TableHead>
                <TableHead className="w-40 ">Remarks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kpiApprovalData.map((data, index) => (
                <TableRow key={data.id}>
                  <TableCell>{data?.kpi_id}</TableCell>
                  <TableCell>{data?.kpiDetails.name}</TableCell>
                  <TableCell>
                    {data.kpiDetails.kpi_datapoint || "No question"}
                  </TableCell>
                  <TableCell>
                    <Input value={data?.max_range} disabled />
                  </TableCell>
                  <TableCell>
                    <Input value={data?.input_data} type="number" disabled />
                  </TableCell>
                  <TableCell>
                    <Textarea
                      disabled
                      type="text"
                      name="remarks"
                      value={data?.remarks}
                    />
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
          <Input
            disabled
            value={
              kpiApprovalData[0]?.date
                ? kpiApprovalData[0]?.date.substring(0, 10)
                : ""
            }
            type="date"
            name="date"
            onChange={e => setDate(e.target.value)}
            id="date"
            placeholder="Enter date"
            className="px-10"
          />
        </div>
      </div>
    </div>
  );
}

export default GpWiseKpiView;
