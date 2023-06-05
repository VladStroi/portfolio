import * as React from 'react';
import { TableCell, TableRow } from '@mui/material';

export const CategoryRow = ({ category }) => (
  <TableRow
    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
  >
    <TableCell component="th" scope="row">
      {category.id}
    </TableCell>
    <TableCell align="left" component="th" scope="row">
      {category.name}
    </TableCell>
  </TableRow>
);
