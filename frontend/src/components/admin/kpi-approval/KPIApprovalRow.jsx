import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";

function KPIApprovalRow({ kpiApproval }) {
  return (
    <TableRow>
      <TableCell>{kpiApproval.id}</TableCell>
      <TableCell>{kpiApproval.state_id}</TableCell>
      <TableCell>{kpiApproval.district_id}</TableCell>
      <TableCell>{kpiApproval.taluk_id}</TableCell>
      <TableCell>{kpiApproval.gp_id}</TableCell>
      <TableCell>{kpiApproval.theme_id}</TableCell>
      <TableCell>{kpiApproval.decision}</TableCell>
      <TableCell>{kpiApproval.submitted_id}</TableCell>
      <TableCell>{kpiApproval.remarks}</TableCell>
      <TableCell>{kpiApproval.status}</TableCell>
      <TableCell>{kpiApproval.created_by}</TableCell>
      <TableCell>{new Date(kpiApproval.created_at).toLocaleDateString()}</TableCell>
      <TableCell>{kpiApproval.modified_by}</TableCell>
      <TableCell>{new Date(kpiApproval.modified_at).toLocaleDateString()}</TableCell>
    </TableRow>
  );
}

export default KPIApprovalRow;
