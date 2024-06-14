import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";

function GpRow({ gp }) {
  return (
    <TableRow>
      <TableCell>{gp.id}</TableCell>
      <TableCell>{gp.state_id}</TableCell>
      <TableCell>{gp.dist_id}</TableCell>
      <TableCell>{gp.block_id}</TableCell>
      <TableCell>{gp.lgd_code}</TableCell>
      <TableCell>{gp.name}</TableCell>
      <TableCell>{gp.is_maped_to_another_district}</TableCell>
    </TableRow>
  );
}

export default GpRow;
