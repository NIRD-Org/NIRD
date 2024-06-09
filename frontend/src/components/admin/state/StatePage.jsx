import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TableSkeleton from "@/components/ui/tableskeleton";
import StateRow from "./StateRow";
import StateForm from "./StateForm";
import { states } from "@/lib/data"; // Import states data

const StatePage = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between text-center mb-6">
        <h2 className="text-xl font-semibold mb-4">All States</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add State</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] h-[90vh] scrollbar overflow-y-scroll">
            <StateForm type={"add"} />
          </DialogContent>
        </Dialog>
      </div>
      <Table className="overscroll-x-scroll">
        <TableCaption>List of all states.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>LGD Code</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created By</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Modified By</TableHead>
            <TableHead>Modified At</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableSkeleton columnCount={Object.keys(states[0]).length} />
        ) : (
          <TableBody>
            {states.map((state) => (
              <StateRow key={state.id} state={state} />
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default StatePage;
