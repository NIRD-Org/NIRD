import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { NirdDeleteIcon, NirdEditIcon } from "../Icons";

function StateRow({ state }) {
  return (
    <TableRow>
      <TableCell>{state.id}</TableCell>
      <TableCell>{state.name}</TableCell>
      <TableCell className="flex gap-2 items-center">
        <NirdEditIcon />
        <NirdDeleteIcon/>
      </TableCell>
    </TableRow>
  );
}

export default StateRow;
