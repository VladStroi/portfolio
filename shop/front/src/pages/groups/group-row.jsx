import * as React from 'react';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export const GroupRow = ({ group }) => {
  const { currentCurrency } = useSelector((state) => state.currencyState);

  const [open, setOpen] = useState(false);

  const exchangeRate = useMemo(
    () => currentCurrency?.exchange_rate,
    [currentCurrency]
  );

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {group.categoryName}
        </TableCell>
        <TableCell component="th" scope="row">
          {group.products.length} products
        </TableCell>
        <TableCell component="th" scope="row">
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  {group.products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell component="th" scope="row">
                        {product.name}
                      </TableCell>
                      <TableCell >{group.categoryName}</TableCell>
                      <TableCell align="center">
                        {currentCurrency?.symbol} {product.price * exchangeRate}
                      </TableCell>
                      <TableCell align="right">{product.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
