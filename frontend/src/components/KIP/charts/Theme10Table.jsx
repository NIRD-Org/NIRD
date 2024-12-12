import React, { useEffect, useState } from "react";
import API from "@/utils/API";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Theme10Table = ({ state, dist, block, gp, fy }) => {
  const [numberInputData, setNumberInputData] = useState([]);
  const [otherInputData, setOtherInputData] = useState([]);

  // Fetch and sort data from API
  useEffect(() => {
    if (!state || !dist || !block || !gp || !fy) return;

    const fetchData = async () => {
      try {
        const response = await API.get(
          `/api/v1/gp-wise-kpi/table?state=${state}&dist=${dist}&block=${block}&gp=${gp}&fy=${fy}`
        );

        if (response.data && Array.isArray(response.data.data)) {
          const sortedData = response.data.data.sort((a, b) => a.kpi.id - b.kpi.id);
          // Split data based on input_type
          setNumberInputData(sortedData.filter(item => item.kpi.input_type === "number"));
          setOtherInputData(sortedData.filter(item => item.kpi.input_type !== "number"));
        } else {
          console.error("Unexpected data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [state, dist, block, gp, fy]);

  const renderTable = (title, data) => (
    <div className="overflow-x-auto bg-white rounded-lg shadow-lg mb-6">
      <h2 className="text-lg font-semibold text-center text-blue-900 mb-4">{title}</h2>
      <Table className="w-full border border-gray-300">
        <TableHeader>
          <TableRow className="bg-blue-100">
            <TableHead className="py-3 px-4 text-sm font-semibold text-gray-800 border-r">
              S.No.
            </TableHead>
            <TableHead className="py-3 px-4 text-sm font-semibold text-gray-800 border-r">
              KPI ID
            </TableHead>
            <TableHead className="py-3 px-4 text-sm font-semibold text-gray-800 border-r">
              KPI Name
            </TableHead>
            <TableHead className="py-3 px-4 text-sm font-semibold text-gray-800 border-r">
              Datapoint
            </TableHead>
            <TableHead className="py-3 px-4 text-sm font-semibold text-gray-800 border-r">
              Input Type
            </TableHead>
            <TableHead className="py-3 px-4 text-sm font-semibold text-gray-800">
              Cumulative Achieved
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow
              key={item._id}
              className={`hover:bg-blue-50 ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <TableCell className="py-2 px-4 text-center border-r text-sm text-gray-600">
                {index + 1}
              </TableCell>
              <TableCell className="py-2 px-4 text-center border-r text-sm text-gray-600">
                {item.kpi.id}
              </TableCell>
              <TableCell className="py-2 px-4 text-left border-r text-sm text-gray-600">
                {item.kpi.name}
              </TableCell>
              <TableCell className="py-2 px-4 text-left border-r text-sm text-gray-600">
                {item.kpi.kpi_datapoint}
              </TableCell>
              <TableCell className="py-2 px-4 text-left border-r text-sm text-gray-600">
                {item.kpi.input_type}
              </TableCell>
              <TableCell className="py-2 px-4 text-left text-sm text-gray-600">
                {item.input_data}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="p-6 w-full bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-center text-blue-900 mb-6">
        Gram Panchayat KPI Progress
      </h1>
      {renderTable("Number Input KPIs", numberInputData)}
      {renderTable("Other Input KPIs", otherInputData)}
    </div>
  );
};

export default Theme10Table;
