import * as React from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { removeItem, updateProductQuantity } from './order-slice';

const OrderItem = ({ product }) => {
  const dispatch = useDispatch();
  const { currentCurrency } = useSelector((state) => state.currencyState);
  const onDelete = useCallback(
    () => dispatch(removeItem(product)),
    [dispatch, product]
  );

  const onChangeAmount = useCallback(
    (event) => {
      dispatch(updateProductQuantity({ quantity: +event.target.value, id: product.id }));
    },
    [dispatch, product.id]
  );

  const formatMoney = (value) => {
    return `${currentCurrency?.symbol} ${value * currentCurrency?.exchange_rate}`;
  }

  return (
    <TableRow
      key={product.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row"> {product.name}</TableCell>
      <TableCell align="center">{formatMoney(product.price)}</TableCell>
      <TableCell align="right">{product.amount}</TableCell>
      <TableCell align="right">
        <TextField
          id="product-quantity"
          type="number"
          value={product.quantity}
          onChange={onChangeAmount}
          inputProps={{ min: 1, max: product.amount }}
        />
      </TableCell>
      <TableCell align="right">{formatMoney(product.price * product.quantity)}</TableCell>
      <TableCell align="right">
        <Button variant="text" onClick={onDelete}>Delete</Button>
      </TableCell>
    </TableRow>
  )
}

const OrderTotal = ({ total }) => {
  const { currentCurrency } = useSelector((state) => state.currencyState);
  if (!currentCurrency) {
    return null;
  }

  return (
    <TableFooter>
      <TableRow>
        <TableCell rowSpan={3} colSpan={4} />
        <TableCell colSpan={1} align="right"><b>Total</b></TableCell>
        <TableCell align="left">
          {currentCurrency.symbol} {total * currentCurrency.exchange_rate}
        </TableCell>
      </TableRow>
    </TableFooter>
  );
};

export const OrderItems = ({ cartItems, total }) => {
  if (!cartItems.length) {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          Cart is empty
        </Grid>
      </Grid>
    )
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="right">In Stock</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.map((product) => (
            <OrderItem
              key={product.id}
              product={product}
            />
          ))}
        </TableBody>
        <OrderTotal total={total} />
      </Table>
    </TableContainer>
  );
};
