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
  const [data, setData] = useState([]);

  // Fetch data from API
  useEffect(() => {
    if (!state || !dist || !block || !gp || fy) return;
    const fetchData = async () => {
      try {
        const { data } = await API.get(
          `/api/v1/gp-wise-kpi/table?state=${state}&dist=${dist}&block=${block}&gp=${gp}&fy=${fy}`
        );
        setData(data.data);
      } catch (error) {
        setData([]);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [state, dist, block, gp, fy]);

  return (
    <div className="p-4 w-full px-4 md:px-10 lg:px-20 ">
      <Table className="w-full border border-gray-200 rounded-lg shadow-md">
        <TableHeader className="w-full">
          <TableRow>
            <TableHead>S.No.</TableHead>
            <TableHead>KPI ID</TableHead>
            <TableHead>KPI Name</TableHead>
            <TableHead>Datapoint</TableHead>
            <TableHead>Max Number</TableHead>
            <TableHead>Cumulative Achieved</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="w-full">
          {data.map((item, index) => (
            <TableRow key={item._id} className="hover:bg-gray-100">
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.kpi.id}</TableCell>
              <TableCell>{item.kpi.name}</TableCell>
              <TableCell>{item.kpi.kpi_datapoint}</TableCell>
              <TableCell>{item.kpi.max_range}</TableCell>
              <TableCell>{item.input_data}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Theme10Table;
