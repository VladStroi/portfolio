import * as React from 'react';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Backdrop,
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  Dialog,
  Slide,
  Toolbar,
  Typography,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { OrderStatus, calculateTotals, closeCart, openCart } from './order-slice';
import { OrderContainer } from './order-container';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ShoppingCart = () => {
  const dispatch = useDispatch();
  const { isCartOpen, items, amount, total, orderStatus } = useSelector((state) => state.shoppingCart);

  const handleClickOpen = useCallback(
    () => dispatch(openCart()),
    [dispatch]
  );

  const handleClose = useCallback(
    () => dispatch(closeCart()),
    [dispatch]
  );

  useEffect(
    () => {
      dispatch(calculateTotals());
    },
    [items, dispatch]
  );

  const cartContent = (() => {
    switch (orderStatus) {
      case OrderStatus.Placed:
        return (
          <Card>
            <CardContent>
              Thank you for shopping with us!
            </CardContent>
            <CardActions>
              <Button size="small" onClick={handleClose}>
                Continue shopping
              </Button>
            </CardActions>
          </Card>
        );
      default:
        return (
          <OrderContainer
            onClose={handleClose}
            cartItems={items}
            total={total}
          />
        );

    }
  })();


  return (
    <div>
      <Badge badgeContent={amount} color="info" invisible={!amount}>
        <ShoppingCartIcon
          onClick={handleClickOpen}
          sx={{
            '&:hover': {
              cursor: 'pointer',
            },
          }}
        />
      </Badge>

      <Dialog
        fullScreen
        open={isCartOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Order
            </Typography>
          </Toolbar>
        </AppBar>
        <Container component="main" sx={{ p: 2 }}>
          {cartContent}
        </Container>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={orderStatus === OrderStatus.Busy}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Dialog>
    </div >
  );
};
