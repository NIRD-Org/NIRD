import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { NirdDeleteIcon, NirdEditIcon } from "../Icons";

const fields = ["id",  "state_id", "name", "special_area"];

function DistrictRow({ district }) {
  return (
    <TableRow>
      {fields.map(field => (
        <TableCell key={field}>{district[field] || ""}</TableCell>
      ))}
      <TableCell className="flex gap-2 items-center">
        <NirdEditIcon />
        <NirdDeleteIcon />
      </TableCell>
    </TableRow>
  );
}

export default DistrictRow;
