import * as React from 'react';
import { useCallback } from 'react';
import { MenuItem } from '@mui/material';

export const MainMenuItem = ({ handleCloseMenu, menu }) => {
  const handleClose = useCallback(
    event => handleCloseMenu(event, menu),
    [menu, handleCloseMenu]
  );
  return <MenuItem onClick={handleClose}>{menu.name}</MenuItem>;
};
