import * as React from 'react';
import { useNavigate } from 'react-router';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { MainMenuItems } from './common/menu/main-menu-items';
import { CurrencyContainer } from './common/currency/currency-container';
import { ShoppingCart } from './order/cart';
import { homePage } from './pages';

export const Header = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <MainMenuItems />
          <CurrencyContainer />
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              '&:hover': {
                cursor: 'pointer',
              },
            }}
            onClick={() => navigate(homePage.path)}
          >
            Vlad Stroi Shop
          </Typography>
          <ShoppingCart />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
