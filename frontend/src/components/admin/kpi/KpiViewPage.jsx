import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import API from "@/utils/API";
import AdminHeader from "../AdminHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";

const KpiViewPage = () => {
  const { kpiId } = useParams(); 
  const [kpi, setKpi] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchKpi = async () => {
      try {
        setIsLoading(true);
        const { data } = await API.get(`/api/v1/kpi/${kpiId}`);
        setKpi(data?.kpi); 
      } catch (error) {
        console.error("Error fetching KPI:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKpi();
  }, [kpiId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!kpi) {
    return <div>KPI not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <AdminHeader>KPI Details</AdminHeader>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>{kpi.id}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Theme</TableCell>
            <TableCell>{kpi.theme_name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>KPI Name</TableCell>
            <TableCell>{kpi.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Data Point</TableCell>
            <TableCell>{kpi.kpi_datapoint}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Input Type</TableCell>
            <TableCell>{kpi.input_type}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Kpi Type</TableCell>
            <TableCell>{kpi.kpi_type}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Weightage</TableCell>
            <TableCell>{kpi.weightage}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Score Rules</TableCell>
            <TableCell>{kpi.score_rules}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default KpiViewPage;
