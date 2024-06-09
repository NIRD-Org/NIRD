import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TableSkeleton from "@/components/ui/tableskeleton";
import KPIApprovalRow from "./KPIApprovalRow";
import KPIApprovalForm from "./KPIApprovalForm";
import { kpiApprovals } from "@/lib/data"; 

const KPIApprovalPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between text-center mb-6">
        <h2 className="text-xl font-semibold mb-4">All KPI Approvals</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add KPI Approval</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] h-[90vh] scrollbar overflow-y-scroll">
            <KPIApprovalForm type={"add"} />
          </DialogContent>
        </Dialog>
      </div>
      <Table className="overscroll-x-scroll">
        <TableCaption>List of all KPI approvals.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>State ID</TableHead>
            <TableHead>District ID</TableHead>
            <TableHead>Taluk ID</TableHead>
            <TableHead>GP ID</TableHead>
            <TableHead>Theme ID</TableHead>
            <TableHead>Decision</TableHead>
            <TableHead>Submitted ID</TableHead>
            <TableHead>Remarks</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created By</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Modified By</TableHead>
            <TableHead>Modified At</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableSkeleton columnCount={Object.keys(kpiApprovals[0]).length} />
        ) : (
          <TableBody>
            {kpiApprovals.map((kpiApproval) => (
              <KPIApprovalRow key={kpiApproval.id} kpiApproval={kpiApproval} />
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default KPIApprovalPage;
