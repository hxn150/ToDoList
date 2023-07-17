import * as React from "react";
import { TableCell, TableRow } from "@mui/material";

export default function Header() {
  return (
    <TableRow>
      <TableCell align="center" size="medium">
        Title
      </TableCell>
      <TableCell align="center" size="medium">
        Description
      </TableCell>
      <TableCell align="center" size="medium">
        Deadline
      </TableCell>
      <TableCell align="center" size="medium">
        Priority
      </TableCell>
      <TableCell align="center" size="medium">
        Is Complete
      </TableCell>
      <TableCell align="center" size="medium">
        Action
      </TableCell>
    </TableRow>
  );
}
