import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

function ThemeRow({ theme }) {
  return (
    <TableRow>
      <TableCell>{theme.id}</TableCell>
      <TableCell>{theme.theme_name}</TableCell>
      <TableCell>
        <Button>Edit</Button>
      </TableCell>
    </TableRow>
  );
}

export default ThemeRow;
