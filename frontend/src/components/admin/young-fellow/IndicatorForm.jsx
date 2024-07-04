import React, { useEffect, useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import API from "@/utils/API";
import { tst } from "@/lib/utils";
import AdminHeader from "../AdminHeader";
import { useYfLocation } from "@/components/hooks/useYfLocation";
import FormField from "@/components/ui/formfield";

function IndicatorForm({ type = "add" }) {
  const [formData, setFormData] = useState({
    state_id: "",
    dist_id: "",
    block_id: "",
    gp_id: "",
    date: "",
    financial_year: "",
  });
  const [indicatorFormData, setIndicatorFormData] = useState([]);
  const [indicators, setIndicators] = useState([]);
  const [pending, setPending] = useState(false);

  const {
    yfState: states,
    yfBlock: blocks,
    yfDist: districts,
    yfGp: gp,
  } = useYfLocation({
    state_id: formData.state_id,
    dist_id: formData.dist_id,
    block_id: formData.block_id,
  });

  
  useEffect(() => {
    setFormData(prevData => ({ ...prevData, dist_id: "" }));
  }, [formData.state_id]);

  useEffect(() => {
    setFormData(prevData => ({ ...prevData, block_id: "" }));
  }, [formData.dist_id]);

  useEffect(() => {
    setFormData(prevData => ({ ...prevData, gp_id: "" }));
  }, [formData.block_id]);

  const handleFormChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    const fetchIndicators = async () => {
      try {
        const response = await API.get("/api/v1/indicator/all");
        setIndicators(response.data?.indicators || []);
      } catch (error) {
        console.error("Error fetching indicators:", error);
      }
    };

    fetchIndicators();
  }, []);

  const handleIndicatorChange = (e, index) => {
    const { name, value } = e.target;
    setIndicatorFormData(prevData => {
      const updatedData = [...prevData];
      updatedData[index] = { ...updatedData[index], [name]: value };
      return updatedData;
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const updatedFormData = indicators.map((item, index) => ({
      ...indicatorFormData[index],
      indicator_id: item.id,
      max_range: item.max_range,
    }));

    const dataToSend = { ...formData, formData: updatedFormData };
    try {
      setPending(true);
      await API.post("/api/v1/gp-wise-indicator/submit", dataToSend);
      tst.success("Form submitted successfully");
    } catch (error) {
      tst.error(error);
      console.error("Error submitting data:", error);
    } finally {
      setPending(false);
    }
  };

  const fields = useMemo(
    () => [
      {
        name: "state_id",
        label: "State",
        type: "select",
        options: states.map(state => ({ value: state.id, label: state.name })),
        required: true,
      },
      {
        name: "dist_id",
        label: "District",
        type: "select",
        options: districts.map(district => ({ value: district.id, label: district.name })),
        required: true,
      },
      {
        name: "block_id",
        label: "Block",
        type: "select",
        options: blocks.map(block => ({ value: block.id, label: block.name })),
        required: true,
      },
      {
        name: "gp_id",
        label: "GP",
        type: "select",
        options: gp.map(gp => ({ value: gp.id, label: gp.name })),
        required: true,
      },
      {
        name: "financial_year",
        label: "Financial Year",
        type: "select",
        options: Array.from({ length: 30 }, (_, i) => {
          const startYear = 2021 + i;
          const endYear = startYear + 1;
          return { value: `FY${startYear}-${endYear}`, label: `FY${startYear}-${endYear}` };
        }),
        required: true,
      },
    ],
    [states, districts, blocks, gp]
  );

  const resetForm = () => {
    setFormData({
      state_id: "",
      dist_id: "",
      block_id: "",
      gp_id: "",
      date: "",
      financial_year: "",
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="py-4">
        <AdminHeader>{type === "add" ? "Young Fellow - Indicators Entry" : "Update Gram Panchayat"}</AdminHeader>
        <div className="grid gap-10 grid-cols-2 sm:grid-cols-4 md:grid-cols-4">
          {fields.map(field => (
            <FormField
              key={field.name}
              {...field}
              disabled={pending}
              value={formData[field.name]}
              onChange={handleFormChange}
            />
          ))}
          <Button className="self-end" onClick={resetForm}>
            Reset
          </Button>
        </div>
        <div className="mt-10">
          <form onSubmit={handleSubmit} className="overflow-auto">
            <Table className="w-max">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">ID</TableHead>
                  <TableHead className="w-[400px]">Indicator</TableHead>
                  <TableHead className="w-40">Max Range</TableHead>
                  <TableHead className="w-40">Input</TableHead>
                  <TableHead className="w-76">Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {indicators.map((data, index) => (
                  <TableRow key={data.id}>
                    <TableCell>{data.id}</TableCell>
                    <TableCell>{data.name}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        disabled
                        name="max_range"
                        value={indicatorFormData[index]?.max_range || data.max_range}
                        onChange={e => handleIndicatorChange(e, index)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        required
                        type="number"
                        max={data.max_range}
                        name="input_data"
                        value={indicatorFormData[index]?.input_data || ""}
                        onChange={e => handleIndicatorChange(e, index)}
                      />
                    </TableCell>
                    <TableCell>
                      <Textarea
                        type="text"
                        name="remarks"
                        value={indicatorFormData[index]?.remarks || ""}
                        onChange={e => handleIndicatorChange(e, index)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="w-max my-4">
              <Label htmlFor="date" className="text-right mt-2">
                Date
              </Label>
              <Input
                type="date"
                name="date"
                value={formData.date || ""}
                onChange={handleFormChange}
                id="date"
                placeholder="Enter date"
                className="px-10"
              />
            </div>
            <Button className="mt-10 px-20" type="submit" pending={pending}>
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default IndicatorForm;
