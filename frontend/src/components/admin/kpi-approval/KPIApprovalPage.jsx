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
import KPIApprovalRow from "./KPIApprovalRow";
import KPIApprovalForm from "./KPIApprovalForm";
import API from "@/utils/API";
import { tst } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";

const KPIApprovalPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [kpiApprovals, setKpiApprovals] = useState([]);
  const [searchParams] = useSearchParams();
  const theme_id = searchParams.get("theme_id") || "";

  const handleCreateKpApproval = async (formData) => {
    try {
      await API.post("/api/v1/kpi-approvals/create", formData);
      tst.success("Kp created successfully");
    } catch (error) {
      tst.error(error);
    }
  };

  const getAllKpiApprovals = async () => {
    try {
      setIsLoading(true);
      const { data } = await API.get(`/api/v1/kpi-approvals/all`);
      setKpiApprovals(data?.KPIApprovals);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getAllKpiApprovals();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between text-center mb-6">
        <h2 className="text-xl font-semibold mb-4">All KPI Approvals</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add KPI Approval</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] scrollbar overflow-y-scroll">
            <KPIApprovalForm type={"add"} onSubmit={handleCreateKpApproval} />
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
            <TableHead>block ID</TableHead>
            <TableHead>GP ID</TableHead>
            <TableHead>Theme ID</TableHead>
            <TableHead>Decision</TableHead>
            <TableHead>Submitted ID</TableHead>
            <TableHead>Remarks</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableSkeleton columnCount={14} />
        ) : (
          <TableBody>
            {kpiApprovals?.length == 0 ? (
              <tr>
                <td colSpan="14">No KPI approval found</td>
              </tr>
            ) : (
              kpiApprovals.map((kpiApproval) => (
                <KPIApprovalRow
                  key={kpiApproval.id}
                  kpiApproval={kpiApproval}
                />
              ))
            )}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default KPIApprovalPage;
