import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";

function KPIApprovalRow({ kpiApproval }) {
  return (
    <TableRow>
      <TableCell>{kpiApproval.id}</TableCell>
      <TableCell>{kpiApproval.state_id}</TableCell>
      <TableCell>{kpiApproval.district_id}</TableCell>
      <TableCell>{kpiApproval.block_id}</TableCell>
      <TableCell>{kpiApproval.gp_id}</TableCell>
      <TableCell>{kpiApproval.theme_id}</TableCell>
      <TableCell>{kpiApproval.decision}</TableCell>
      <TableCell>{kpiApproval.submitted_id}</TableCell>
      <TableCell>{kpiApproval.remarks}</TableCell>
    </TableRow>
  );
}

export default KPIApprovalRow;
