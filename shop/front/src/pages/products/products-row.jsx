import * as React from 'react';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TableCell, TableRow } from '@mui/material';
import { addToCart } from '../../order/order-slice';

export const ProductRow = ({ product, currency }) => {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.shoppingCart);

  const onAddToCart = useCallback(
    () => {
      if (!product.amount) {
        console.error('Can not add to card product with amount is 0');
        return;
      }
      dispatch(addToCart({ ...product, quantity: 1 }));
    },
    [dispatch, product]
  );

  const productAmount = useMemo(
    () => {
      const cardItem = items.find(item => item.id === product.id);
      return cardItem
        ? product.amount - cardItem.quantity
        : product.amount;
    },
    [items, product.id, product.amount]
  );

  const isOutOfStock = !productAmount;

  return (
    <TableRow
      key={product.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row"> {product.name}</TableCell>
      <TableCell align="center">{currency?.symbol} {product.price * currency?.exchange_rate}</TableCell>
      <TableCell align="right">{productAmount}</TableCell>
      <TableCell align="right">
        <Button disabled={isOutOfStock} variant="text" onClick={onAddToCart}>
          {
            isOutOfStock
              ? 'Out of stock'
              : 'Add to cart'
          }
        </Button>
      </TableCell>
    </TableRow>
  );
};
