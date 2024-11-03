import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import API from "@/utils/API";
import { tst } from "@/lib/utils";
import AdminHeader from "@/components/admin/AdminHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useParams, useSearchParams } from "react-router-dom";
import { showAlert } from "@/utils/showAlert";

function IndicatorApprovalResubmit({ type = "add", edit }) {
  const [formData, setFormData] = useState({
    state_id: "",
    dist_id: "",
    block_id: "",
    gp_id: "",
    date: "",
    financial_year: "",
  });
  const [indicatorFormData, setIndicatorFormData] = useState([]);
  const [indicatorApprovalData, setIndicatorApprovalData] = useState([]);
  const [indicators, setIndicators] = useState([]);
  const { id: submitted_id } = useParams();

  useEffect(() => {
    const fetchIndicatorApprovalData = async () => {
      try {
        const url = `/api/v1/gp-wise-indicator/approval-data?submitted_id=${submitted_id}`;
        const response = await API.get(url);
        const data = response.data.data;
        setIndicatorApprovalData(response.data.data || []);
        setIndicatorFormData(
          data.map((item) => ({
            id: item.id,
            indicator_id: item.indicator_id,
            name: item.indicator.name,
            max_range: item.max_range,
            input_data: item.input_data,
            submitted_id: item.submitted_id,
            remarks: item.remarks,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };

    async function fetchIndicators() {
      try {
        const response = await API.get("/api/v1/indicator/all");
        setIndicators(response.data?.indicators || []);
      } catch (error) {
        console.log(error);
      }
    }

    fetchIndicatorApprovalData();
    fetchIndicators();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setIndicatorFormData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index] = {
        ...updatedData[index],
        [name]: value,
      };
      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let updatedFormData = indicators.map((item, index) => {
      return {
        ...indicatorFormData[index],
        indicator_id: item.id,
        max_range: item.max_range,
      };
    });
    try {
      const response = await API.put("/api/v1/gp-wise-indicator/resubmit", {
        formData: updatedFormData,
        submitted_id,
      });
      console.log("Success:", response.data);
      showAlert("Form submitted successfully", "success");
    } catch (error) {
      tst.error(error);
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div>
        <div className="py-4">
          <AdminHeader>
            {type === "add"
              ? "Young Fellow - Indicators Entry"
              : "Update Gram Panchayat"}
          </AdminHeader>
          <div>
            <div className="p-6">
              <div className=" mt-4">
                <div className="flex flex-wrap justify-around gap-10">
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
                    {
                      label: "GP:",
                      value: indicatorApprovalData[0]?.gp?.name,
                    },
                    {
                      label: "Financial Year:",
                      value: indicatorApprovalData[0]?.financial_year,
                    },
                  ].map(({ label, value }) => (
                    <h3 key={label}>
                      <strong className="text-primary">{label}</strong> {value}
                    </h3>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <form onSubmit={handleSubmit} className="overflow-auto ">
              <Table className=" w-max">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10">ID</TableHead>
                    <TableHead className="w-[400px]">Indicator</TableHead>
                    <TableHead className="w-40">Max Range</TableHead>
                    <TableHead className="w-40">Input</TableHead>
                    <TableHead className="w-80 ">Remarks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {indicators.map((data, index) => (
                    <TableRow key={data.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{data.name}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          disabled
                          name="max_range"
                          value={
                            indicatorFormData[index]?.max_range ||
                            data.max_range
                          }
                          onChange={(e) => handleChange(e, index)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          required
                          type="number"
                          max={data.max_range}
                          name="input_data"
                          value={indicatorFormData[index]?.input_data || ""}
                          onChange={(e) => handleChange(e, index)}
                        />
                      </TableCell>
                      <TableCell>
                        <Textarea
                          type="text"
                          name="remarks"
                          value={indicatorFormData[index]?.remarks || ""}
                          onChange={(e) => handleChange(e, index)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {!edit && (
                <div className="w-max my-4 flex gap-10">
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
                    onChange={(e) => setDate(e.target.value)}
                    id="date"
                    placeholder="Enter date"
                    className="px-10"
                  />

                  <div>
                    <Label htmlFor="decision" className="mb-2 block">
                      Remark
                    </Label>
                    <Textarea
                      disabled
                      value={indicatorApprovalData[0]?.approver_remarks || ""}
                      className="w-80"
                      type="text"
                      name="remarks"
                    />
                  </div>
                </div>
              )}

              <Button className="mt-10 px-20" type="submit">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndicatorApprovalResubmit;
