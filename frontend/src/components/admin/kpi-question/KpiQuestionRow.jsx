import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";

function KpiRow({ kpiQuestion }) {
  return (
    <TableRow>
    <TableCell>{kpiQuestion.id}</TableCell>
    <TableCell>{kpiQuestion.theme_id}</TableCell>
    <TableCell>{kpiQuestion.kpi_id}</TableCell>
    <TableCell>{kpiQuestion.question_name}</TableCell>
    <TableCell>{kpiQuestion.question_type}</TableCell>
  </TableRow>
  );
}

export default KpiRow;
