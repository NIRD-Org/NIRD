import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";

function KpiRow({ kpiQuestion }) {
  return (
    <TableRow>
    <TableCell>{kpiQuestion.id}</TableCell>
    <TableCell>{kpiQuestion.theme_id}</TableCell>
    <TableCell>{kpiQuestion.kpi_id}</TableCell>
    <TableCell>{kpiQuestion.question_name}</TableCell>
    <TableCell>{kpiQuestion.input_type}</TableCell>
    <TableCell>{kpiQuestion.max_range}</TableCell>
    <TableCell>{kpiQuestion.question_type}</TableCell>
    <TableCell>{kpiQuestion.status}</TableCell>
    <TableCell>{kpiQuestion.created_by}</TableCell>
    <TableCell>{new Date(kpiQuestion.created_at).toLocaleDateString()}</TableCell>
    <TableCell>{kpiQuestion.modified_by}</TableCell>
    <TableCell>{new Date(kpiQuestion.modified_at).toLocaleDateString()}</TableCell>
    <TableCell>{kpiQuestion.flag}</TableCell>
  </TableRow>
  );
}

export default KpiRow;
