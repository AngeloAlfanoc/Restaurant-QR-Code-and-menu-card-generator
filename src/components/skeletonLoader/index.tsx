import { TableCell, TableRow } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";

export default function SkeletonComponent() {
  return (
    <TableRow>
      <TableCell align="left">
        <Skeleton animation="wave" />
      </TableCell>
      <TableCell align="left">
        <Skeleton animation="wave" />
      </TableCell>
      <TableCell align="left">
        <Skeleton animation="wave" />
      </TableCell>
      <TableCell align="left">
        <Skeleton animation="wave" />
      </TableCell>
    </TableRow>
  );
}
