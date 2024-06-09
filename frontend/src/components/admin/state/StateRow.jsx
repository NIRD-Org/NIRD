import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";

function StateRow({ state }) {
  return (
    <TableRow>
      <TableCell>{state.id}</TableCell>
      <TableCell>{state.lgd_code}</TableCell>
      <TableCell>{state.name}</TableCell>
      <TableCell>{state.status}</TableCell>
      <TableCell>{state.created_by}</TableCell>
      <TableCell>{new Date(state.created_at).toLocaleDateString()}</TableCell>
      <TableCell>{state.modified_by}</TableCell>
      <TableCell>{new Date(state.modified_at).toLocaleDateString()}</TableCell>
    </TableRow>
  );
}

export default StateRow;
