import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";

const fields = ["id", "lgd_code", "state_id", "name", "special_area"];

function DistrictRow({ district }) {
  return (
    <TableRow>
      {fields.map((field) => (
        <TableCell key={field}>{district[field] || ""}</TableCell>
      ))}
    </TableRow>
  );
}

export default DistrictRow;


