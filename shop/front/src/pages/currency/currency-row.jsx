import * as React from 'react';
import { TableCell, TableRow } from '@mui/material';

export const CurrencyRow = ({ currency }) => (
  <TableRow
    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
  >
    <TableCell component="th" scope="row">
      {currency.symbol}
      
    </TableCell>
    <TableCell align="left" component="th" scope="row">
      {currency.name}
    </TableCell>
  </TableRow>
);
