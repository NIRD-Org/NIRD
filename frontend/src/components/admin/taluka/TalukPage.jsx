"use client";
import React, { useState } from "react";
import TalukRow from "./TalukRow";
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
import TalukForm from "./TalukForm";
import { taluks } from "@/lib/data"; 

const TalukPage = ({}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between text-center mb-6">
        <h2 className="text-xl font-semibold mb-4">All Taluks</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add Taluk</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] h-[90vh] scrollbar overflow-y-scroll">
            <TalukForm type={"add"} />
          </DialogContent>
        </Dialog>
      </div>
      <Table className="overscroll-x-scroll">
        <TableCaption>List of all taluks.</TableCaption>
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
          <TableSkeleton columnCount={Object.keys(taluks[0]).length} />
        ) : (
          <TableBody>
            {taluks.map(taluk => (
              <TalukRow key={taluk.id} taluk={taluk} />
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default TalukPage;
