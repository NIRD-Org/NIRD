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

function IndicatorApprovalAdminForm() {
  const [searchParams] = useSearchParams();
  const submitted_id = searchParams.get("submitted_id") || "";
  const [indicatorApprovalData, setIndicatorApprovalData] = useState([]);
  const [formData, setFormData] = useState({ decision: "", remarks: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIndicatorApprovalData = async () => {
      try {
        const url = `/api/v1/gp-wise-indicator/approval-data?submitted_id=${submitted_id}`;
        const response = await API.get(url);
        setIndicatorApprovalData(response.data.data || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchIndicatorApprovalData();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const body = {
        decision: formData.decision,
        remarks: formData.remarks,
      };

      const url = `/api/v1/indicator-approvals/update/${submitted_id}`;
      const response = await API.put(url, body);
      tst.success("Form submitted successfully");
      //   navigate("/admin/admin-action-form");
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
            Young Fellow - Indicator Entry Form
          </h2>
        </div>
        <div>
          <div className="p-6">
            <div className=" mt-4">
              <div className="flex flex-wrap justify-around">
                {[
                  { label: "State:", value: indicatorApprovalData[0]?.state?.name },
                  { label: "District:", value: indicatorApprovalData[0]?.district?.name },
                  { label: "Block:", value: indicatorApprovalData[0]?.block?.name },
                  { label: "GP:", value: indicatorApprovalData[0]?.gp?.name },
                ].map(({ label, value }) => (
                  <h3 key={label}>
                    <strong className="text-primary">{label}</strong> {value}
                  </h3>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto mt-6">
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">ID</TableHead>
                  <TableHead className="w-[200px]">Indicator Name</TableHead>
                  <TableHead className="w-[200px]">Data point</TableHead>
                  <TableHead className="w-32">Max Range </TableHead>
                  <TableHead className="w-20">Input</TableHead>
                  <TableHead className="w-40">Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {indicatorApprovalData.map((data, index) => (
                  <TableRow key={data.id}>
                    <TableCell>{data?.indicator_id}</TableCell>
                    <TableCell>{data?.indicator.name}</TableCell>
                    <TableCell>
                      {data.indicator.indicator_datapoint ||
                        "No question"}
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
                indicatorApprovalData[0]?.date
                  ? indicatorApprovalData[0]?.date.substring(0, 10)
                  : ""
              }
              type="date"
              name="date"
              id="date"
              placeholder="Enter date"
              className="px-10"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mt-8 flex gap-4">
            <div className="w-max my-4">
              <Label htmlFor="decision" className="mb-2 block">
                Decision
              </Label>
              <select
                required
                className="px-4 py-2 rounded-md bg-white"
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
              <Label htmlFor="remarks" className="mb-2 block">
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

export default IndicatorApprovalAdminForm;
