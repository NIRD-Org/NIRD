import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useParams } from "react-router-dom";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import API from "@/utils/API";
import { Textarea } from "@/components/ui/textarea";

function IndicatorView() {
  const { id: submitted_id } = useParams();
  const [indicatorApprovalData, setIndicatorApprovalData] = useState([]);
  
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

  return (
    <div>
      <div>
        <div className="p-6">
          <div className=" mt-4">
            <div className="flex flex-wrap justify-around">
              {[
                {
                  label: "State:",
                  value: indicatorApprovalData[0]?.state?.name,
                },
                {
                  label: "District:",
                  value: indicatorApprovalData[0]?.district?.name,
                },
                {
                  label: "Block:",
                  value: indicatorApprovalData[0]?.block?.name,
                },
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
                    {data.indicator.indicator_datapoint || "No question"}
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
          <Label htmlFor="date" className="mt-2">
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
    </div>
  );
}

export default IndicatorView;
