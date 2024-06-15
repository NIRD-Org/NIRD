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
import { Link, useSearchParams } from "react-router-dom";
import StateFilter from "@/components/admin/filter/StateFilter";
import DistrictFilter from "@/components/admin/filter/DistrictFilter";

const BlockPage = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [blocks, setblocks] = useState([]);
  const [searchParams] = useSearchParams();
  const dist_id = searchParams.get("dist_id");
  const state_id = searchParams.get("state_id");

  const getAllblocks = async (dist_id) => {
    try {
      setIsLoading(true);
      const url = `/api/v1/block/get?dist=${dist_id}`;
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
        <Link to="/admin/block/create">
          <Button>Add Block</Button>
        </Link>
      </div>
      <Table className="overscroll-x-scroll">
        <TableCaption>List of all blocks.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>

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
