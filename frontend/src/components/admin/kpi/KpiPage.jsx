import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import TableSkeleton from "@/components/ui/tableskeleton";
import API from "@/utils/API";
import { Link, useSearchParams } from "react-router-dom";
import {
  NirdBanIcon,
  NirdDeleteIcon,
  NirdEditIcon,
  NirdViewIcon,
} from "../Icons";
import AdminHeader from "../AdminHeader";
import ThemeFilter from "../filter/ThemeFilter";

const DataPointPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const theme_id = searchParams.get("theme_id") || "";
  const [kpiData, setKpiData] = useState([]);

  const getAllKpi = async () => {
    try {
      setIsLoading(true);
      const { data } = await API.get(`/api/v1/kpi/all`);
      if (theme_id) {
        setKpiData(data?.KPI.filter(kpi => kpi.theme_id === theme_id));
      } else {
        setKpiData(data?.KPI);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllKpi();
  }, [theme_id]);

  const handleDelete = async id => {
    if (window.confirm("Are you sure you want to delete this KPI?")) {
      try {
        await API.delete(`/api/v1/kpi/${id}`);
        getAllKpi();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <AdminHeader>All KPI</AdminHeader>
      <div className="flex justify-between items-center my-4 flex-wrap gap-4">
        <ThemeFilter />
        <Link to="/admin/data-point/create">
          <Button>Add KPI</Button>
        </Link>
      </div>
      <Table className="overscroll-x-scroll">
        <TableCaption>List of all Key Performance Indicators.</TableCaption>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Theme</TableHead>
          <TableHead>KPI Name</TableHead>
          <TableHead>Data Point</TableHead>
          <TableHead>Input Type</TableHead>
          <TableHead>Weightage</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
        {isLoading ? (
          <TableSkeleton columnCount={6} />
        ) : (
          <TableBody>
            {kpiData.map((kpi, index) => (
              <TableRow key={kpi.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{kpi.theme_name}</TableCell>
                <TableCell>{kpi.name}</TableCell>
                <TableCell>{kpi.kpi_datapoint}</TableCell>
                <TableCell>{kpi.input_type}</TableCell>
                <TableCell>{kpi.weightage}</TableCell>
                <TableCell className="flex gap-3 ">
                  {kpi.status != 0 ? (
                    <>
                      <Link to={`/admin/data-point/update/${kpi.id}`}>
                        <NirdEditIcon />
                      </Link>
                      <Link to={`/admin/data-point/view/${kpi.id}`}>
                        <NirdViewIcon />
                      </Link>
                      <div onClick={() => handleDelete(kpi.id)}>
                        <NirdDeleteIcon />
                      </div>
                    </>
                  ) : (
                    <NirdBanIcon />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default DataPointPage;
