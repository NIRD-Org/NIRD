import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";

function GpRow({ gp }) {
  return (
    <TableRow>
      <TableCell>{gp.id}</TableCell>
      <TableCell>{gp.state_id}</TableCell>
      <TableCell>{gp.dist_id}</TableCell>
      <TableCell>{gp.taluk_id}</TableCell>
      <TableCell>{gp.lgd_code}</TableCell>
      <TableCell>{gp.lgd_code_feb11_2021}</TableCell>
      <TableCell>{gp.name}</TableCell>
      <TableCell>{gp.is_maped_to_another_district}</TableCell>
      <TableCell>{gp.status}</TableCell>
      <TableCell>{gp.created_by}</TableCell>
      <TableCell>{new Date(gp.created_at).toLocaleDateString()}</TableCell>
      <TableCell>{gp.modified_by}</TableCell>
      <TableCell>{new Date(gp.modified_at).toLocaleDateString()}</TableCell>
    </TableRow>
  );
}

export default GpRow;
