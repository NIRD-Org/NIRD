import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";

function KpiRow({ kpi }) {
  return (
    <TableRow>
      <TableCell>{kpi.id}</TableCell>
      <TableCell>{kpi.theme_id}</TableCell>
      <TableCell>{kpi.kpi_name}</TableCell>
      <TableCell>{kpi.max_range}</TableCell>
      <TableCell>{kpi.Input_Type}</TableCell>
      <TableCell>{kpi.status}</TableCell>
      <TableCell>{kpi.weightage}</TableCell>
      <TableCell>{kpi.created_by}</TableCell>
      <TableCell>{new Date(kpi.created_at).toLocaleDateString()}</TableCell>
      <TableCell>{kpi.modified_by}</TableCell>
      <TableCell>{new Date(kpi.modified_at).toLocaleDateString()}</TableCell>
      <TableCell>{kpi.flag}</TableCell>
    </TableRow>
  );
}

export default KpiRow;
