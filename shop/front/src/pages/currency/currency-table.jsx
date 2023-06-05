import * as React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { CurrencyRow } from './currency-row';

export const CurrencyTable = ({ currencies }) => (
  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell>Symbol</TableCell>
          <TableCell align="left">Name</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {currencies.map(currency => <CurrencyRow key={currency.symbol} currency={currency} />)}
      </TableBody>
    </Table>
  </TableContainer>
  );