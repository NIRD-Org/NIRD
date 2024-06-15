import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";

function KpiRow({ kpi }) {
  return (
    <TableRow>
      <TableCell>{kpi.id}</TableCell>
      <TableCell>{kpi.theme_id}</TableCell>
      <TableCell>{kpi.kpi_name}</TableCell>
    </TableRow>
  );
}

export default KpiRow;
