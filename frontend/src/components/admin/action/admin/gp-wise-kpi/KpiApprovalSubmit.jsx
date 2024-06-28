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
import API from "@/utils/API";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import YfLayout from "../../../young-fellow/YfLayout";
import { Textarea } from "@/components/ui/textarea";
import { tst } from "@/lib/utils";

function KpiApprovalSubmit() {
  const [searchParams] = useSearchParams();
  const theme_id = searchParams.get("theme_id") || "";
  const [kpiApprovalData, setKpiApprovalData] = useState([]);
  const gp_id = searchParams.get("gram_id") || "";
  const submitted_id = searchParams.get("submitted_id") || "";
  const [formData, setFormData] = useState({ decision: "", remarks: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKpiApprovalData = async () => {
      try {
        const url = `/api/v1/gp-wise-kpi/approval-data?gp=${gp_id}&theme=${theme_id}&submitted_id=${submitted_id}`;
        const response = await API.get(url);
        setKpiApprovalData(response.data.data || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchKpiApprovalData();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const body = {
        decision: formData.decision,
        remarks: formData.remarks,
      };

      const url = `/api/v1/kpi-approvals/update/${submitted_id}`;
      const response = await API.put(url, body);
      console.log(response.data);
      tst.success("Form submitted successfully");
      navigate("/admin/admin-action-form");
    } catch (error) {
      tst.error("Failed to submit form");
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-10 text-center bg-slate-100 py-3">
            Young Fellow - KPI Entry Form
          </h2>
        </div>
        <YfLayout />
        <div className="overflow-x-auto  mt-6">
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
                    <TableCell>{data?.kpi_id}</TableCell>
                    <TableCell>{data?.kpiDetails.name}</TableCell>
                    <TableCell>
                      {data.kpiDetails.kpi_datapoint || "No question"}
                    </TableCell>
                    {/* <TableCell>{data?.kpiDetails.input_type}</TableCell> */}
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
                      {/* <Input value={data?.remarks} disabled type="number" /> */}
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

            {/* <Input disabled value={kpiApprovalData[0]?.date} type="date" name="date" onChange={e => setFormData(prevData => ({ ...prevData, date: e.target.value }))} id="date" placeholder="Enter date" className="px-10" /> */}
          </div>
          {/* <Button type="submit">Submit</Button> */}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mt-8 flex  gap-4">
            <div className="w-max my-4">
              <Label htmlFor="decision" className="mb-2 block">
                Decision
              </Label>
              <select
                required
                className="px-4 py-2 rounded-md bg-white "
                id="decision"
                name="decision"
                value={formData.decision || ""}
                onChange={e =>
                  setFormData(prevData => ({
                    ...prevData,
                    decision: e.target.value,
                  }))
                }
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="1">Approve</option>
                <option value="2">Send for Modification</option>
              </select>
            </div>
            <div>
              <Label htmlFor="decision" className="mb-2 block">
                Remark
              </Label>
              <Textarea
                required={formData.decision === "2"}
                value={formData.remarks || ""}
                onChange={e =>
                  setFormData(prevData => ({
                    ...prevData,
                    remarks: e.target.value,
                  }))
                }
                className="w-80"
                type="text"
                name="remarks"
              />
            </div>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}

export default KpiApprovalSubmit;
