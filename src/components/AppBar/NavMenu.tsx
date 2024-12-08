import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Button, Menu, MenuItem, Drawer, List, Container, Box, Tooltip, Avatar, ListItemButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../../context/AuthContext';
import logo from '../../logo.svg';
import './NavMenu.css';

const NavMenu = () => {
  const authContext = useAuth();
  const { user, logout } = authContext || {};

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [submenuIndex, setSubmenuIndex] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false); // State for drawer

  const menuItems = [
    { name: 'Home', path: '/' },
    {
      name: 'My organization',
      path: '/',
      subItems: [
        { name: 'Groups or Companies', path: '/companies' },
        { name: 'Projects', path: '/projects' },
        { name: 'Teams', path: '/teams' },
        { name: 'Users', path: '/users' },
      ],
    },
    { name: 'Profile', path: '/profile' },
    { name: 'Contact Us', path: '/contact' },
  ];
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
    setAnchorEl(event.currentTarget as HTMLElement);
    setSubmenuIndex(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSubmenuIndex(null);
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const drawerList = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map((item) => (
          <ListItemButton key={item.name} component={Link} to={item.path}>
            {item.name}
          </ListItemButton>
        ))}
        {user && (
          <ListItemButton onClick={logout}>
            Logout
          </ListItemButton>
        )}
      </List>
    </div>
  );

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <img className="logo" src={logo} alt="Logo" />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {menuItems.map((item, index) => (
              <div key={item.name}>
                {item.subItems ? (
                  <>
                    <Button color="inherit" onClick={(event) => handleMenuClick(event, index)}>
                      {item.name}
                    </Button>
                    <Menu
                      anchorEl={anchorEl}
                      open={submenuIndex === index}
                      onClose={handleClose}
                    >
                      {item.subItems.map((subItem) => (
                        <MenuItem key={subItem.name} onClick={handleClose} component={Link} to={subItem.path}>
                          {subItem.name}
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                ) : (
                  <Button color="inherit" component={Link} to={item.path}>
                    {item.name}
                  </Button>
                )}
              </div>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {user && (
              <Tooltip title="Logout">
                <IconButton onClick={logout} sx={{ p: 0 }}>
                  <Avatar alt="User Profile" src={user.picture} />
                </IconButton>
              </Tooltip>
            )}
            <IconButton className="menuIcon" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList()}
      </Drawer>
    </AppBar>
  );
};

export default NavMenu;
