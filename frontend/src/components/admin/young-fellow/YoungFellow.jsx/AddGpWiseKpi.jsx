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

function AddGpWiseKpi() {
  const [searchParams, setSearchParams] = useSearchParams();
  const state_id = searchParams.get("state_id") || "";
  const dist_id = searchParams.get("dist_id") || "";
  const block_id = searchParams.get("block_id") || "";
  const gp_id = searchParams.get("gram_id") || "";
  const theme_id = searchParams.get("theme_id") || "";
  const [kpis, setKpis] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState([]);
  const [date, setDate] = useState(null);
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let kpis;
    const fetchKpis = async () => {
      try {
        const response = await API.get(`/api/v1/kpi/theme/${theme_id}`);
        kpis = response.data.KPI;
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
      <div className="p-6 ">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-10 text-center bg-slate-100 py-3">Young Fellow Form - Edit</h2>
        </div>
        <form onSubmit={handleSubmit} className="overflow-x-auto w-[1050px] ">
          <div>
            <Table className="w-max ">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">KPI Name</TableHead>
                  <TableHead className="w-[300px]">Data point</TableHead>
                  <TableHead>Input type</TableHead>
                  <TableHead className="w-40">Max Number (Total Number)</TableHead>
                  <TableHead className="w-40">Cumulative Achived Number</TableHead>
                  {/* <TableHead>Score</TableHead> */}
                  <TableHead className="w-80 ">Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {kpis.map((data, index) => (
                  <TableRow key={data.id}>
                    <TableCell>{data.name}</TableCell>
                    <TableCell>{data.kpi_datapoint || "No question"}</TableCell>
                    <TableCell>{data?.input_type}</TableCell>
                    <TableCell>
                      <Input type="number" disabled name="max_range" value={data?.max_range} onChange={e => handleChange(e, index)} />
                    </TableCell>
                    <TableCell>
                      <Input required type="number" name="input_data" value={formData[index]?.input_data || ""} onChange={e => handleChange(e, index)} />
                    </TableCell>
                    {/* <TableCell>
                      <Input type="text" disabled />
                    </TableCell> */}
                    <TableCell>
                      <Textarea type="text" name="remarks" value={formData[index]?.remarks || ""} onChange={e => handleChange(e, index)} />
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

export default AddGpWiseKpi;
