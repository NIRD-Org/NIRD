import React, { useEffect, useState } from "react";
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
import { tst } from "@/lib/utils";
import API from "@/utils/API";
import StateFilter from "@/components/admin/filter/StateFilter";
import { useSearchParams } from "react-router-dom";

const DistrictPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [searchParams] = useSearchParams();
  const state_id = searchParams.get("state_id");

  useEffect(() => {
    if (state_id) {
      getAllDistricts(state_id);
    }
  }, [state_id]);

  const handleCreateDistrict = async formData => {
    try {
      await API.post("/api/v1/dist/create", formData);
      tst.success("District created successfully");
    } catch (error) {
      tst.error(error);
      console.log(error);
    }
  };

  const getAllDistricts = async v => {
    try {
      setIsLoading(true);
      const { data } = await API.get(`/api/v1/dist/state/${v}`);
      setDistricts(data?.districts);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between text-center mb-6">
        <div className="space-x-4 flex  items-center">
          <h2 className="text-xl font-semibold ">All Districts</h2>
          <StateFilter />
        </div>
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
          <TableSkeleton columnCount={11} />
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
