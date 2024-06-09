import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";

function ThemeRow({ theme }) {
  return (
    <TableRow>
      <TableCell>{theme.id}</TableCell>
      <TableCell>{theme.theme_name}</TableCell>
      <TableCell>{theme.status}</TableCell>
      <TableCell>{theme.created_by}</TableCell>
      <TableCell>{new Date(theme.created_at).toLocaleDateString()}</TableCell>
      <TableCell>{theme.modified_by}</TableCell>
      <TableCell>{new Date(theme.modified_at).toLocaleDateString()}</TableCell>
      <TableCell>{theme.flag}</TableCell>
    </TableRow>
  );
}

export default ThemeRow;
