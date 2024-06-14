import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";

function StateRow({ state }) {
  return (
    <TableRow>
      <TableCell>{state.id}</TableCell>
      <TableCell>{state.lgd_code}</TableCell>
      <TableCell>{state.name}</TableCell>
    </TableRow>
  );
}

export default StateRow;
