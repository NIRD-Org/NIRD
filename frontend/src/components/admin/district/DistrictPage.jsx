import React, { useState } from "react";
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
import DistrictRow from "./DistrictRow";
import DistrictForm from "./DistrictForm";
import { districts } from "@/lib/data";
import api from "@/lib/api";

const DistrictPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleCreateDistrict = async formData => {
    try {
      const response = await api.post("/api/v1/district/create", formData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between text-center mb-6">
        <h2 className="text-xl font-semibold mb-4">All Districts</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add District</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] h-[90vh] scrollbar overflow-y-scroll">
            <DistrictForm type={"add"} onSubmit={handleCreateDistrict} />
          </DialogContent>
        </Dialog>
      </div>
      <Table className="overscroll-x-scroll">
        <TableCaption>List of all districts.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>LGD Code</TableHead>
            <TableHead>State ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Special Area</TableHead>
            <TableHead>Special Area ID</TableHead>
            <TableHead>Aspirational District</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created By</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Modified By</TableHead>
            <TableHead>Modified At</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableSkeleton columnCount={Object.keys(districts[0]).length} />
        ) : (
          <TableBody>
            {districts.map(district => (
              <DistrictRow key={district.id} district={district} />
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default DistrictPage;
