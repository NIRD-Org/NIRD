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
import GpRow from "./GpRow";
import GpForm from "./GpForm";
import API from "@/utils/API";
import { tst } from "@/lib/utils";

const GpPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const gp = [];

  const handleCreateGp = async formData => {
    try {
      await API.post("/api/v1/gram/create", formData);
      tst.success("GP created successfully");
    } catch (error) {
      tst.error(error);
    }
  };
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between text-center mb-6">
        <h2 className="text-xl font-semibold mb-4">All Gram Panchayats</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add Gram Panchayat</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] h-[90vh] scrollbar overflow-y-scroll">
            <GpForm type={"add"} onSubmit={handleCreateGp} />
          </DialogContent>
        </Dialog>
      </div>
      <Table className="overscroll-x-scroll">
        <TableCaption>List of all Gram Panchayats.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>State ID</TableHead>
            <TableHead>District ID</TableHead>
            <TableHead>Taluk ID</TableHead>
            <TableHead>LGD Code</TableHead>
            <TableHead>LGD Code (Feb 11, 2021)</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Mapped to Another District</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created By</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Modified By</TableHead>
            <TableHead>Modified At</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableSkeleton columnCount={Object.keys(gp[0]).length} />
        ) : (
          <TableBody>
            {gp.map(gp => (
              <GpRow key={gp.id} gp={gp} />
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default GpPage;
