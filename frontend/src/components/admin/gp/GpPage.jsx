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
import { useSearchParams } from "react-router-dom";
import StateFilter from "@/components/admin/filter/StateFilter";
import GramFilter from "@/components/admin/filter/GramFilter";
import DistrictFilter from "@/components/admin/filter/DistrictFilter";
import BlockFilter from "@/components/admin/filter/BlockFilter";

const GpPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const state_id = searchParams.get("state_id") || "";
  const dist_id = searchParams.get("dist_id") || "";
  const block_id = searchParams.get("block_id") || "";
  const [gp, setGrams] = useState([]);

  useEffect(() => {
    if (block_id) {
      getAllGp(block_id);
    } else {
      setGrams([]);
    }
  }, [block_id]);

  const getAllGp = async (blockId) => {
    try {
      setIsLoading(true);
      const { data } = await API.get(`/api/v1/gram/get?block=${blockId}`);
      setGrams(data?.gram || []);
    } catch (error) {
      setGrams([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateGp = async (formData) => {
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
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold ">All Gram Panchayats</h2>
          <StateFilter />
          <DistrictFilter />
          <BlockFilter />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add Gram Panchayat</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] scrollbar overflow-y-scroll">
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
            <TableHead>block ID</TableHead>
            <TableHead>LGD Code</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Mapped to Another District</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableSkeleton columnCount={10} />
        ) : (
          <TableBody>
            {gp.map((gp) => (
              <GpRow key={gp.id} gp={gp} />
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default GpPage;
