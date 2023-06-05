import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Menu } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { routes } from '../../pages';
import { MainMenuItem } from './main-menu-item';

export const MainMenuItems = () => {
  const [anchorMenu, setAnchorMenu] = useState(null);

  const navigate = useNavigate()

  const open = Boolean(anchorMenu);

  const handleClickMenu = (event, menuItem) => {
    setAnchorMenu(event.currentTarget);
    if (menuItem) {
      navigate(menuItem.path);
    }
  };

  const handleCloseMenu = (_, select) => {
    setAnchorMenu(null);
    if (select) {
      navigate(select.path);
    }
  };

  return (
    <>
      <MenuIcon
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
        onClick={handleClickMenu}
      ></MenuIcon>
      <Menu
        id="basic-menu"
        anchorEl={anchorMenu}
        open={open}
        onClose={handleCloseMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {routes.map((page) => {
          return (
            <MainMenuItem
              key={page.name}
              handleCloseMenu={handleCloseMenu}
              menu={page}
            />
          )
        })}
      </Menu>
    </>
  );
};
