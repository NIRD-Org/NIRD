import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import API from "@/utils/API";
import { tst } from "@/lib/utils";
import AdminHeader from "../AdminHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

function IndicatorForm({ type = "add" }) {
  const [formData, setFormData] = useState({
    state_id: "",
    dist_id: "",
    block_id: "",
    gp_id: "",
    date: "",
    financialYear: "", // Add this line
  });
  const [indicatorFormData, setIndicatorFormData] = useState([]);

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [gp, setGp] = useState([]);
  const [indicators, setIndicators] = useState([]);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    async function fetchStates() {
      try {
        const response = await API.get("/api/v1/state/all");
        setStates(response.data?.states || []);
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchIndicators() {
      try {
        const response = await API.get("/api/v1/indicator/all");
        setIndicators(response.data?.indicators || []);
      } catch (error) {
        console.log(error);
      }
    }

    fetchStates();
    fetchIndicators();
  }, []);

  useEffect(() => {
    async function fetchDistricts() {
      if (formData.state_id) {
        try {
          const response = await API.get(
            `/api/v1/dist/state/${formData.state_id}`
          );
          setDistricts(response.data?.districts || []);
          setFormData((prevData) => ({
            ...prevData,
            // state_id: "",
            dist_id: "",
            block_id: "",
            gp_id: "",
          }));
        } catch (error) {
          tst.error("Failed to fetch districts.");
        }
      }
    }

    fetchDistricts();
  }, [formData.state_id]);

  useEffect(() => {
    async function fetchBlocks() {
      if (formData.dist_id) {
        try {
          const response = await API.get(
            `/api/v1/block/get?dist=${formData.dist_id}`
          );
          setBlocks(response.data?.blocks || []);
          setFormData((prevData) => ({
            ...prevData,
            // state_id: "",
            // dist_id: "",
            block_id: "",
            gp_id: "",
          }));
        } catch (error) {
          tst.error("Failed to fetch blocks.");
        }
      }
    }

    fetchBlocks();
  }, [formData.dist_id]);

  useEffect(() => {
    async function fetchGrams() {
      try {
        const { data } = await API.get(
          `/api/v1/gram/get?block=${formData.block_id}`
        );
        setGp(data?.gram || []);
        setFormData((prevData) => ({
          ...prevData,
          // state_id: "",
          // dist_id: "",
          // block_id: "",
          gp_id: "",
        }));
      } catch (error) {
        console.log(error);
      }
    }
    fetchGrams();
  }, [formData.block_id]);

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

    const dataToSend = {
      ...formData,
      formData: updatedFormData,
    };

    try {
      const response = await API.post(
        "/api/v1/gp-wise-indicator/submit",
        dataToSend
      );
      console.log("Success:", response.data);
      tst.success("Form submitted successfully");
    } catch (error) {
      tst.error(error);
      console.error("Error submitting data:", error);
    }
  };

  const fields = [
    {
      name: "state_id",
      label: "State",
      type: "select",
      options: states.map((state) => ({ value: state.id, label: state.name })),
      required: true,
    },
    {
      name: "dist_id",
      label: "District",
      type: "select",
      options: districts.map((district) => ({
        value: district.id,
        label: district.name,
      })),
      required: true,
    },
    {
      name: "block_id",
      label: "Block",
      type: "select",
      options: blocks.map((block) => ({ value: block.id, label: block.name })),
      required: true,
    },
    {
      name: "gp_id",
      label: "GP",
      type: "select",
      options: gp.map((gp) => ({ value: gp.id, label: gp.name })),
      required: true,
    },
    {
      name: "financialYear", // Add this field
      label: "Financial Year",
      type: "select",
      options: Array.from({ length: 30 }, (_, i) => {
        const startYear = 2021 + i;
        const endYear = startYear + 1;
        return { value: `FY${startYear}-${endYear}`, label: `FY${startYear}-${endYear}` };
      }),
      required: true,
    },
  ];

  const resetForm = () => {
    console.log("first");
    setFormData((prevData) => ({
      ...prevData,
      state_id: "",
      dist_id: "",
      block_id: "",
      gp_id: "",
      financialYear: "", // Reset this field
    }));
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
          <div className="grid  gap-10 grid-cols-2 sm:grid-cols-4 md:grid-cols-5">
            {fields.map(
              ({ name, label, type, options, required, disabled = false }) => (
                <div key={name}>
                  <Label htmlFor={name} className="inline-block mb-2">
                    {label}
                  </Label>
                  {required && <span className="text-red-500 ml-1">*</span>}
                  {type === "select" ? (
                    <select
                      required={required}
                      disabled={pending}
                      className="w-full col-span-3 px-4 py-2 rounded-md bg-transparent border"
                      value={formData[name]}
                      name={name}
                      onChange={handleFormChange}
                    >
                      <option value="" disabled>
                        Select {label}
                      </option>
                      {options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Input
                      required={required}
                      disabled={pending || disabled}
                      type={type}
                      name={name}
                      value={formData[name]}
                      onChange={handleFormChange}
                      id={name}
                      placeholder={`Enter ${label}`}
                      className="col-span-3"
                    />
                  )}
                </div>
              )
            )}
            <Button className="self-end" onClick={() => resetForm()}>
              Reset
            </Button>
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
                      <TableCell>{data.id}</TableCell>
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

export default IndicatorForm;