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
import GpWiseKpiRow from "./GpWiseKpiRow";
import { gpWiseKpi } from "@/lib/data";
import GpWiseKpiForm from "./GpWiseKpiForm";

const GpWiseKpiPage = () => {
  //   const [gpWiseKpiList, setGpWiseKpiList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //   useEffect(() => {
  //     // Fetch gp-wise kpi data from your backend API
  //     async function fetchGpWiseKpiList() {
  //       try {
  //         const response = await fetch("/api/gpwisekpi"); // Adjust the API endpoint accordingly
  //         const data = await response.json();
  //         setGpWiseKpiList(data);
  //         setIsLoading(false);
  //       } catch (error) {
  //         console.error("Error fetching gp-wise kpi data:", error);
  //         setIsLoading(false);
  //       }
  //     }

  //     fetchGpWiseKpiList();
  //   }, []);

  return (
    <div className=" p-4 w-[80%]">
      <div className="flex justify-between text-center mb-6">
        <h2 className="text-xl font-semibold mb-4">GP-wise KPI</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add GP-wise KPI</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] h-[90vh] scrollbar overflow-y-scroll">
            <GpWiseKpiForm type={"add"} />
          </DialogContent>
        </Dialog>
      </div>
      <div className=" ">
        <Table>
          <TableCaption>List of GP-wise KPIs.</TableCaption>
          <TableHeader className="w-[400px]">
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>State ID</TableHead>
              <TableHead>District ID</TableHead>
              <TableHead>Taluk ID</TableHead>
              <TableHead>GP ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Theme ID</TableHead>
              <TableHead>KPI ID</TableHead>
              <TableHead>Question ID</TableHead>
              <TableHead>Max Range</TableHead>
              <TableHead>Input Data</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Remarks</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted ID</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Modified By</TableHead>
              <TableHead>Modified At</TableHead>
            </TableRow>
          </TableHeader>
          {isLoading ? (
            <TableSkeleton columnCount={Object.keys(gpWiseKpi[0]).length} />
          ) : (
            <TableBody>
              {gpWiseKpi.map(gpWiseKpi => (
                <GpWiseKpiRow key={gpWiseKpi.id} gpWiseKpi={gpWiseKpi} />
              ))}
            </TableBody>
          )}
        </Table>
      </div>
    </div>
  );
};

export default GpWiseKpiPage;
