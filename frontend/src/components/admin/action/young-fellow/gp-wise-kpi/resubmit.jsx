import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import API from "@/utils/API";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { tst } from "@/lib/utils";
import LocationHeader from "../../components/LocationHeader";
import { kpiScoringRules } from "@/lib/data";
import { disabledKpis } from "@/lib/data";

function UpdateGpWiseKpi({ edit }) {
  const [kpiApprovalData, setKpiApprovalData] = useState([]);
  const [formData, setFormData] = useState([]);
  const navigate = useNavigate();
  const { id: submitted_id } = useParams();

  useEffect(() => {
    const fetchKpiApprovalData = async () => {
      try {
        const url = `/api/v1/gp-wise-kpi/approval-data?submitted_id=${submitted_id}`;
        const response = await API.get(url);
        setKpiApprovalData(response.data.data || []);
        const data = response.data.data;
        const updatedFormData = data.map(item => ({
          id: item.id,
          kpi_id: item.kpi_id,
          max_range: item.max_range,
          input_data: item.input_data,
          score: item.score,
          submitted_id: item.submitted_id,
          remarks: item.remarks || "",
        }));
        setFormData(updatedFormData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchKpiApprovalData();
  }, []);

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

      if (name === "max_range" || name === "input_data") {
        const maxRange = updatedData[index].max_range || 0;
        const inputData = updatedData[index].input_data || 0;
        const percentage = (inputData / maxRange) * 100;
        const kpiId = kpis[index].id;
        const inputType = kpis[index].input_type;

        const { thresholds, scores } = kpiScoringRules[kpiId];

        if (inputType === "Percentage") {
          const percentage = (inputData / maxRange) * 100;
          updatedData[index].score = calculateScore(percentage, thresholds, scores);
        } else if (inputType === "Number") {
          updatedData[index].score = calculateScore(inputData, thresholds, scores);
        } else if (inputType === "Boolean") {
          updatedData[index].score = inputData
            ? booleanKpiScoringRules[kpiId].yesScore
            : booleanKpiScoringRules[kpiId].noScore;
        }
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
  console.log();
  const handleSubmit = async e => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await API.put("/api/v1/gp-wise-kpi/resubmit", {
        formData,
        submitted_id: submitted_id,
      });
      console.log("Success:", response.data);
      tst.success("Form submitted successfully");
    } catch (error) {
      console.error(error);
      tst.error(error);
    }
  };

  return (
    <div className="w-full">
      <div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-10 text-center bg-slate-100 py-3">Young Fellow - KPI Entry Form</h2>
        </div>
        <LocationHeader
          state_name={kpiApprovalData[0]?.stateDetails?.name}
          dist_name={kpiApprovalData[0]?.districtDetails?.name}
          block_name={kpiApprovalData[0]?.blockDetails?.name}
          gp_name={kpiApprovalData[0]?.gpDetails?.name}
          theme_name={kpiApprovalData[0]?.themeDetails?.theme_name}
        />
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
                    <TableHead className="w-32">Max Number (Total Number)</TableHead>
                    <TableHead className="w-20">Cumulative Achieved Number</TableHead>
                    <TableHead className="w-40">Score</TableHead>
                    <TableHead className="w-40">Remarks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {kpiApprovalData.map((data, index) => {
                    const isDisabled = disabledKpis.includes(parseInt(data?.kpiDetails?.id));
                    return (
                      <>
                        <TableRow key={data.id}>
                          <TableCell>{data?.kpiDetails?.id}</TableCell>
                          <TableCell>{data?.kpiDetails?.name}</TableCell>
                          <TableCell>{data?.kpiDetails?.kpi_datapoint || "No question"}</TableCell>
                          <TableCell>{data?.kpiDetails?.input_type}</TableCell>
                          <TableCell>
                            <Input
                              disabled={isDisabled}
                              type="number"
                              name="max_range"
                              value={isDisabled ? "0" : formData[index]?.max_range || ""}
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
            {!edit && (
              <div className="w-max my-4 flex gap-10">
                <Label htmlFor="date" className="text-right mt-2">
                  Date
                </Label>
                <Input
                  disabled
                  value={kpiApprovalData[0]?.date ? kpiApprovalData[0]?.date.substring(0, 10) : ""}
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
              </div>
            )}
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateGpWiseKpi;
