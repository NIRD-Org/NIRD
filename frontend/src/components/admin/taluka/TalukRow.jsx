import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";

function TalukRow({ taluk }) {
  return (
    <TableRow>
      <TableCell>{taluk.id}</TableCell>
      <TableCell>{taluk.lgd_code}</TableCell>
      <TableCell>{taluk.state_id}</TableCell>
      <TableCell>{taluk.dist_id}</TableCell>
      <TableCell>{taluk.name}</TableCell>
      <TableCell>{taluk.is_maped_to_another_district}</TableCell>
      <TableCell>{taluk.status}</TableCell>
      <TableCell>{taluk.created_by}</TableCell>
      <TableCell>{new Date(taluk.created_at).toLocaleDateString()}</TableCell>
      <TableCell>{taluk.modified_by}</TableCell>
      <TableCell>{new Date(taluk.modified_at).toLocaleDateString()}</TableCell>
  
    </TableRow>
  );
}

export default TalukRow;
