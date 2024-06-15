import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";

function BlockRow({ block }) {
  return (
    <TableRow>
      <TableCell>{block.id}</TableCell>
      <TableCell>{block.state_id}</TableCell>
      <TableCell>{block.dist_id}</TableCell>
      <TableCell>{block.name}</TableCell>
      <TableCell>{block.is_maped_to_another_district}</TableCell>
      <TableCell>{block.status}</TableCell>
      <TableCell>{block.created_by}</TableCell>
      <TableCell>{new Date(block.created_at).toLocaleDateString()}</TableCell>
      <TableCell>{block.modified_by}</TableCell>
      <TableCell>{new Date(block.modified_at).toLocaleDateString()}</TableCell>
    </TableRow>
  );
}

export default BlockRow;
