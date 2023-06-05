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
import { CategoryRow } from './category-row';

export const CategoryTable = ({ categories }) => (
  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell align="left">Name</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {categories.map(category => <CategoryRow key={category.id} category={category} />)}
      </TableBody>
    </Table>
  </TableContainer>
);
