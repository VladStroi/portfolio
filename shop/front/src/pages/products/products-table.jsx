import * as React from 'react';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { ProductRow } from './products-row';

export const rowsPerPageOptions = [5, 10, 25];

export const ProductsTable = ({ products, onChange, totalCount, defaultRowsPerPage }) => {
  const { currentCurrency } = useSelector((state) => state.currencyState);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  const onPageChange = useCallback(
    (_, page) => {
      setCurrentPage(page);
      onChange({
        skip: page * rowsPerPage,
        take: rowsPerPage,
      });
    },
    [onChange, rowsPerPage]
  );

  const onRowsPerPageChange = useCallback(
    ({ target }) => {
      setRowsPerPage(target.value);
      // skip previous pagination page when changing rows per page
      setCurrentPage(0);
      onChange({ skip: 0, take: target.value });
    },
    [onChange]
  );

  return (
    <Paper>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="right">In Stock</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                currency={currentCurrency}
              />
            ))}
          </TableBody>

        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPage={rowsPerPage}
        page={currentPage}
        count={totalCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[...rowsPerPageOptions, { value: totalCount, label: 'All' }]}
      />
    </Paper>
  );
};
