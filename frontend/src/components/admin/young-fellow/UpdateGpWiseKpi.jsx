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
import YfLayout from "./YfLayout";
import { Textarea } from "@/components/ui/textarea";
import { tst } from "@/lib/utils";
function UpdateGpWiseKpi() {
  const [searchParams] = useSearchParams();
  const theme_id = searchParams.get("theme_id") || "";
  const [kpiApprovalData, setKpiApprovalData] = useState([]);
  const state_id = searchParams.get("state_id") || "";
  const dist_id = searchParams.get("dist_id") || "";
  const block_id = searchParams.get("block_id") || "";
  const gp_id = searchParams.get("gram_id") || "";
  // const submitted_id = searchParams.get("submitted_id") || "";
  const submitted_id = searchParams.get("submitted_id") || "";
  const [formData, setFormData] = useState([]);
  const navigate = useNavigate();
  const [remark, setRemark] = useState("");

  useEffect(() => {
    const fetchKpiApprovalData = async () => {
      try {
        const url = `/api/v1/gp-wise-kpi/approval-data?gp=${gp_id}&theme=${theme_id}&submitted_id=${submitted_id}`;
        const response = await API.get(url);
        console.log(response);
        setKpiApprovalData(response.data.data || []);
        setRemark(response.data.data[0].remarks || "");
        const data = response.data.data;
        const updatedFormData = data.map(item => ({
          id: item.id,
          kpi_id: item.kpi_id,
          max_range: item.max_range,
          input_data: item.input_data,
          score: item.score,
          submitted_id: item.submitted_id,
          remarks: item.remarks || "", // Ensure remarks are initialized
        }));
        setFormData(updatedFormData);
        console.log(updatedFormData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchKpiApprovalData();
  }, []);

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

    13: {
      thresholds: [80, 60, 40, 20],
      scores: [10, 8, 6, 4, 2],
    },
    14: {
      thresholds: [80, 60, 40, 20],
      scores: [10, 8, 6, 4, 2],
    },
    15: {
      thresholds: [80, 60, 40, 20, 0],
      scores: [5, 4, 3, 2, 1],
    },
    16: {
      thresholds: [12, 1],
      scores: [2, 1, 0],
    },
    17: {
      thresholds: [500, 1],
      scores: [2, 1, 0],
    },
    18: {
      thresholds: [12, 1],
      scores: [2, 1, 0],
    },
    19: {
      thresholds: [12, 1],
      scores: [2, 1, 0],
    },
    20: {
      thresholds: [12, 1],
      scores: [2, 1, 0],
    },
    21: {
      thresholds: [12, 1],
      scores: [2, 1, 0],
    },
    22: {
      thresholds: [12, 1],
      scores: [2, 1, 0],
    },
    23: {
      thresholds: [4, 2, 1, 0],
      scores: [6, 4, 2, 0],
    },
    24: {
      thresholds: [80, 60, 40, 20],
      scores: [5, 4, 3, 2, 1],
    },
    25: {
      thresholds: [80, 60, 40, 20],
      scores: [5, 4, 3, 2, 1],
    },
    26: {
      thresholds: [80, 60, 40, 20],
      scores: [5, 4, 3, 2, 1],
    },
    27: {
      thresholds: [80, 60, 40, 20],
      scores: [5, 4, 3, 2, 1],
    },
    28: {
      thresholds: [80, 61, 41, 21, 0],
      scores: [10, 8, 6, 4, 2, 0],
    },
    29: {
      thresholds: [12, 10, 7, 4, 1],
      scores: [5, 4, 3, 2, 1, 0],
    },
    30: {
      thresholds: [80, 61, 41, 21, 0],
      scores: [10, 8, 6, 4, 2],
    },
    31: {
      thresholds: [80, 61, 41, 21, 0],
      scores: [10, 8, 6, 4, 2],
    },
    32: {
      thresholds: [60, 40, 20, 10, 0],
      scores: [0, 1, 2, 3, 4],
    },
    33: {
      thresholds: [40, 20, 10, 0],
      scores: [0, 1, 2, 3],
    },
    34: {
      thresholds: [40, 20, 10, 0],
      scores: [0, 1, 2, 3],
    },
    35: {
      thresholds: [80, 60, 40, 20, 0],
      scores: [5, 4, 3, 2, 1],
    },
    36: {
      thresholds: [80, 60, 40, 20, 0],
      scores: [5, 4, 3, 2, 1],
    },
    37: {
      thresholds: [80, 60, 40, 20, 0],
      scores: [0, 2, 4, 6, 8, 10],
    },
    38: {
      thresholds: [80, 60, 40, 20, 0],
      scores: [5, 4, 3, 2, 1],
    },
    39: {
      thresholds: [4, 1, 0],
      scores: [2, 1, 0],
    },
    40: {
      thresholds: [4, 1, 0],
      scores: [2, 1, 0],
    },
    41: {
      thresholds: [100, 2, 0],
      scores: [2, 1, 0],
    },
    42: {
      thresholds: [50, 10, 0],
      scores: [2, 1, 0],
    },
    43: {
      thresholds: [80, 60, 40, 20, 0],
      scores: [0, 2, 4, 6, 8, 10],
    },
    44: {
      thresholds: [80, 60, 40, 20, 0],
      scores: [5, 4, 3, 2, 1],
    },
    45: {
      thresholds: [12, 9, 6, 3, 0],
      scores: [4, 3, 2, 1, 0],
    },
    46: {
      thresholds: [80, 60, 40, 20, 0],
      scores: [8, 6, 4, 2, 0],
    },
    47: {
      thresholds: [80, 60, 40, 20, 0],
      scores: [4, 3, 2, 1, 0],
    },
    48: {
      thresholds: [12, 9, 6, 3, 0],
      scores: [4, 3, 2, 1, 0],
    },
    49: {
      thresholds: [4, 1, 0],
      scores: [2, 1, 0],
    },
    50: {
      thresholds: [80, 60, 40, 20, 0],
      scores: [10, 8, 6, 4, 2],
    },
    51: {
      thresholds: [80, 60, 40, 20, 0],
      scores: [10, 8, 6, 4, 2],
    },
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setFormData(prevData => {
      const updatedData = [...prevData];
      updatedData[index] = {
        ...updatedData[index],
        [name]: value,
      };

      if (name === "max_range" || name === "input_data") {
        const maxRange = updatedData[index].max_range || 0;
        const inputData = updatedData[index].input_data || 0;
        const percentage = (inputData / maxRange) * 100;
        const kpiId = kpiApprovalData[index].kpi_id;
        const { thresholds, scores } = kpiScoringRules[kpiId];
        updatedData[index].score = calculateScore(
          percentage,
          thresholds,
          scores
        );
      }

      return updatedData;
    });
  };

  const calculateScore = (percentage, thresholds, scores) => {
    for (let i = 0; i < thresholds.length; i++) {
      if (percentage > thresholds[i]) {
        return scores[i];
      }
    }
    return scores[thresholds.length];
  };
console.log()
  const handleSubmit = async e => {
    e.preventDefault();
    console.log(formData);
    // return;
    try {
      const response = await API.put("/api/v1/gp-wise-kpi/resubmit", {
        formData,
        submitted_id: submitted_id,
      });
      console.log("Success:", response.data);
      tst.success("Form submitted successfully");
      // navigate("/admin/young-professionals");
    } catch (error) {
      console.error(error);
      tst.error(error);
    }
  };

  const disabledKpis = [
    16, 17, 18, 19, 20, 21, 22, 23, 29, 39, 40, 41, 45, 48, 49,
  ];

  return (
    <div className="w-full">
      <div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-10 text-center bg-slate-100 py-3">
            Young Fellow - KPI Entry Form
          </h2>
        </div>
        <YfLayout />
        <form action="" onSubmit={handleSubmit}>
          <div className="overflow-x-auto  mt-6">
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">ID</TableHead>
                    <TableHead className="w-[200px]">KPI Name</TableHead>
                    <TableHead className="w-[200px]">Data point</TableHead>
                    <TableHead className="w-20">Input type</TableHead>
                    <TableHead className="w-32">
                      Max Number (Total Number)
                    </TableHead>
                    <TableHead className="w-20">
                      Cumulative Achieved Number
                    </TableHead>
                    <TableHead className="w-40">Score</TableHead>
                    <TableHead className="w-40">Remarks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {kpiApprovalData.map((data, index) => {
                    const isDisabled = disabledKpis.includes(
                      parseInt(data?.kpiDetails?.id)
                    );
                    return (
                      <>
                        <TableRow key={data.id}>
                          <TableCell>{data?.kpiDetails?.id}</TableCell>
                          <TableCell>{data?.kpiDetails?.name}</TableCell>
                          <TableCell>
                            {data?.kpiDetails?.kpi_datapoint || "No question"}
                          </TableCell>
                          <TableCell>{data?.kpiDetails?.input_type}</TableCell>
                          <TableCell>
                            <Input
                              disabled={isDisabled}
                              type="number"
                              name="max_range"
                              value={
                                isDisabled
                                  ? "0"
                                  : formData[index]?.max_range || ""
                              }
                              onChange={e => handleChange(e, index)}
                            />
                          </TableCell>
                          <TableCell>
                            {!isDisabled ? (
                              <Input
                                required
                                max={formData[index]?.max_range}
                                type="number"
                                name="input_data"
                                value={formData[index]?.input_data || ""}
                                onChange={e => handleChange(e, index)}
                              />
                            ) : (
                              <Input
                                required
                                type="number"
                                name="input_data"
                                value={formData[index]?.input_data || ""}
                                onChange={e => handleChange(e, index)}
                              />
                            )}{" "}
                          </TableCell>
                          <TableCell>
                            <Input
                              disabled
                              type="number"
                              name="score"
                              value={formData[index]?.score || ""}
                              default={data.score}
                              onChange={e => handleChange(e, index)}
                            />
                          </TableCell>
                          <TableCell>
                            <Textarea
                              type="text"
                              name="remarks"
                              value={formData[index]?.remarks || ""}
                              default={data.remarks}
                              onChange={e => handleChange(e, index)}
                            />
                          </TableCell>
                        </TableRow>
                      </>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
            <div className="w-max my-4 flex gap-10">
              <Label htmlFor="date" className="text-right mt-2">
                Date
              </Label>
              <Input
                disabled
                // default={kpiApprovalData.remarks || ""}
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

              <div>
                <Label htmlFor="decision" className="mb-2 block">
                  Remark
                </Label>
                <Textarea
                  disabled
                  value={kpiApprovalData[0]?.approver_remarks || ""}
                  className="w-80"
                  type="text"
                  name="remarks"
                />
              </div>
              {/* <Input disabled value={kpiApprovalData[0]?.date} type="date" name="date" onChange={e => setFormData(prevData => ({ ...prevData, date: e.target.value }))} id="date" placeholder="Enter date" className="px-10" /> */}
            </div>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateGpWiseKpi;
