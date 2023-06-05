import { AttachMoney } from '@mui/icons-material';
import { Menu, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrency, fetchCurrency } from './currency-slice';
import { Status } from '../../constants/types';

export const CurrencyContainer = () => {
  const {
    status,
    currentCurrency,
    currencies,
  } = useSelector(state => state.currencyState);
  const dispatch = useDispatch();
  useEffect(
    () => {
      if (status === Status.Idle) {
        dispatch(fetchCurrency());
      }
    },
    [status, dispatch]
  );
  const [anchorCurrency, setAnchorCurrency] = useState(null);
  const handleClickCurrency = event => setAnchorCurrency(event.currentTarget);
  const createOnSelectCurrencyHandler = (nextCurrency) => () => {
    setAnchorCurrency(null);
    if (nextCurrency) {
      dispatch(changeCurrency(nextCurrency));
    }
  };

  const stringifiedCurrentCurrency = currentCurrency
    ? `${currentCurrency.symbol} ${currentCurrency.name}`
    : '';

  return (
    <>
      <AttachMoney
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{
          mr: 2,
          '&:hover': {
            cursor: 'pointer',
          },
        }}
        onClick={handleClickCurrency}
      />
      {stringifiedCurrentCurrency}
      <Menu
        id="currency-menu"
        anchorEl={anchorCurrency}
        open={Boolean(anchorCurrency)}
        onClose={createOnSelectCurrencyHandler()}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {currencies.map((currency) => (
          <MenuItem
            key={currency.id}
            onClick={createOnSelectCurrencyHandler(currency)}
          >
            {currency.symbol} {currency.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
};
