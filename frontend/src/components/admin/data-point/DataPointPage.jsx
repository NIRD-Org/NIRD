import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableSkeleton from "@/components/ui/tableskeleton";
import API from "@/utils/API";
import { Link } from "react-router-dom";

const DataPointPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [kpiData, setKpi] = useState([]);


  const getAllKpi = async () => {
    try {
      setIsLoading(true);
      const { data } = await API.get(`/api/v1/kpi/all`);
      setKpi(data?.KPI);
    } catch (error) {
      console.log(error);
    }
    finally{
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllKpi();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between text-center mb-6">
        <h2 className="text-xl font-semibold mb-4">All Data Points</h2>
        <Link to="/admin/data-point/create">
          <Button>Add Data Point</Button>
        </Link>
      </div>
      <Table className="overscroll-x-scroll">
        <TableCaption>List of all Key Performance Indicators.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Theme ID</TableHead>
            <TableHead>KPI Name</TableHead>
            <TableHead>Data Point</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableSkeleton columnCount={10} />
        ) : (
          <TableBody>
            {kpiData.map(kpi => (
               <TableRow>
               <TableCell>{kpi.id}</TableCell>
               <TableCell>{kpi.theme_id}</TableCell>
               <TableCell>{kpi.name}</TableCell>
               <TableCell>{kpi.kpi_datapoint}</TableCell>
             </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default DataPointPage;
