import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";

function KpiRow({ kpiQuestion }) {
  return (
    <TableRow>
      {Object.keys(kpiQuestion).map((key, index) => (
        <TableCell key={index}>
          {key.includes("at") ? new Date(kpiQuestion[key]).toLocaleDateString() : kpiQuestion[key]}
        </TableCell>
      ))}
    </TableRow>
  );
}

export default KpiRow;
