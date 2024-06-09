import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";

function GpWiseKpiRow({ gpWiseKpi }) {
  return (
    <TableRow>
      <TableCell>{gpWiseKpi.id}</TableCell>
      <TableCell>{gpWiseKpi.state_id}</TableCell>
      <TableCell>{gpWiseKpi.district_id}</TableCell>
      <TableCell>{gpWiseKpi.taluk_id}</TableCell>
      <TableCell>{gpWiseKpi.gp_id}</TableCell>
      <TableCell>{new Date(gpWiseKpi.date).toLocaleDateString()}</TableCell>
      <TableCell>{gpWiseKpi.theme_id}</TableCell>
      <TableCell>{gpWiseKpi.kpi_id}</TableCell>
      <TableCell>{gpWiseKpi.question_id}</TableCell>
      <TableCell>{gpWiseKpi.max_range}</TableCell>
      <TableCell>{gpWiseKpi.input_data}</TableCell>
      <TableCell>{gpWiseKpi.score}</TableCell>
      <TableCell>{gpWiseKpi.remarks}</TableCell>
      <TableCell>{gpWiseKpi.status}</TableCell>
      <TableCell>{gpWiseKpi.submitteed_id}</TableCell>
      <TableCell>{gpWiseKpi.created_by}</TableCell>
      <TableCell>{new Date(gpWiseKpi.created_at).toLocaleDateString()}</TableCell>
      <TableCell>{gpWiseKpi.modified_by}</TableCell>
      <TableCell>{new Date(gpWiseKpi.modified_at).toLocaleDateString()}</TableCell>
    </TableRow>
  );
}

export default GpWiseKpiRow;
