"use client";
import React, { useEffect, useState } from "react";
import BlockRow from "./BlockRow";
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
import BlockForm from "./BlockForm";
import API from "@/utils/API";
import { tst } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";
import StateFilter from "@/components/admin/filter/StateFilter";
import DistrictFilter from "@/components/admin/filter/DistrictFilter";

const BlockPage = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [blocks, setblocks] = useState([]);
  const [searchParams] = useSearchParams();
  const dist_id = searchParams.get("dist_id");
  const state_id = searchParams.get("state_id");

  const handleCreateblocka = async (formData) => {
    try {
      await API.post("/api/v1/block/create", formData);
      tst.success("block created successfully");
    } catch (error) {
      tst.error(error);
      console.log(error);
    }
  };

  const getAllblocks = async (stateId, dist_id) => {
    try {
      setIsLoading(true);
      const url = `/api/v1/block/get?state=${state_id}&dist=${dist_id}`;
      const { data } = await API.get(url);
      setblocks(data?.blocks);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (dist_id && state_id) {
      getAllblocks(state_id, dist_id);
    }
  }, [dist_id, state_id]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between text-center mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold ">All blocks</h2>
          <StateFilter />
          <DistrictFilter />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add block</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] h-[90vh] scrollbar overflow-y-scroll">
            <BlockForm type={"add"} onSubmit={handleCreateblocka} />
          </DialogContent>
        </Dialog>
      </div>
      <Table className="overscroll-x-scroll">
        <TableCaption>List of all blocks.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>LGD Code</TableHead>
            <TableHead>State ID</TableHead>
            <TableHead>District ID</TableHead>
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
          <TableSkeleton columnCount={10} />
        ) : (
          <TableBody>
            {blocks.map((block) => (
              <BlockRow key={block.id} block={block} />
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default BlockPage;
