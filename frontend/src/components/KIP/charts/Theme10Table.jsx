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
  const [sortOrder, setSortOrder] = useState('asc');

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

  // Handle column sorting
  const handleSort = () => {
    const sortedData = [...data].sort((a, b) => {
      const idA = a.kpi.id;
      const idB = b.kpi.id;
      if (idA < idB) return sortOrder === 'asc' ? -1 : 1;
      if (idA > idB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    setData(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="p-4 w-full px-4 md:px-10 lg:px-20 ">
      <Table className="w-full border border-gray-200 rounded-lg shadow-md">
      <TableHeader className="w-full" style={{ backgroundColor: '#A4DDED' }}> {/* Sky Blue Background */}
  <TableRow>
    <TableHead>S.No.</TableHead>
    <TableHead onClick={handleSort} style={{ cursor: 'pointer' }}>
      KPI ID {sortOrder === 'asc' ? '🔼' : '🔽'}
    </TableHead>
    <TableHead>KPI Name</TableHead>
    <TableHead>Datapoint</TableHead>
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
              <TableCell>{item.input_data}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Theme10Table;
