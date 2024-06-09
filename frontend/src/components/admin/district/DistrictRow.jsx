import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";

function DistrictRow({ district }) {
  return (
    <TableRow>
      <TableCell>{district.id}</TableCell>
      <TableCell>{district.lgd_code}</TableCell>
      <TableCell>{district.state_id}</TableCell>
      <TableCell>{district.name}</TableCell>
      <TableCell>{district.special_area}</TableCell>
      <TableCell>{district.special_area_id}</TableCell>
      <TableCell>{district.aspirational_district}</TableCell>
      <TableCell>{district.status}</TableCell>
      <TableCell>{district.created_by}</TableCell>
      <TableCell>{new Date(district.created_at).toLocaleDateString()}</TableCell>
      <TableCell>{district.modified_by}</TableCell>
      <TableCell>{new Date(district.modified_at).toLocaleDateString()}</TableCell>
    </TableRow>
  );
}

export default DistrictRow;
