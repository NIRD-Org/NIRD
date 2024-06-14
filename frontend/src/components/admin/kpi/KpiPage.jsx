import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableSkeleton from "@/components/ui/tableskeleton";
import KpiRow from "./KpiRow";
import KpiForm from "./KpiForm";
import API from "@/utils/API";
import { tst } from "@/lib/utils";

const KpiPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [kpiData, setKpi] = useState([]);
  const handleCreateGp = async formData => {
    try {
      await API.post("/api/v1/kpi/create", formData);
      tst.success("Kpi created successfully");
    } catch (error) {
      tst.error(error);
    }
  };

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
        <h2 className="text-xl font-semibold mb-4">All Key Performance Indicators</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add KPI</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] scrollbar overflow-y-scroll">
            <KpiForm type={"add"} onSubmit={handleCreateGp} />
          </DialogContent>
        </Dialog>
      </div>
      <Table className="overscroll-x-scroll">
        <TableCaption>List of all Key Performance Indicators.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Theme ID</TableHead>
            <TableHead>KPI Name</TableHead>
            <TableHead>Max Range</TableHead>
            <TableHead>Input Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Weightage</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableSkeleton columnCount={10} />
        ) : (
          <TableBody>
            {kpiData.map(kpi => (
              <KpiRow key={kpi.id} kpi={kpi} />
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default KpiPage;
