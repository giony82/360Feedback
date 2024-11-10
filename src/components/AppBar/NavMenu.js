import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Button, Menu, MenuItem, Typography, Drawer, List, ListItem, Container, Box, Tooltip, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../../context/AuthContext';
import logo from '../../logo.svg'; // Import the logo
import './NavMenu.css'; // Import the CSS file

const NavMenu = () => {
  const { user, logout } = useAuth();
  
  const [anchorEl, setAnchorEl] = useState(null); // State for submenu anchor
  const [submenuIndex, setSubmenuIndex] = useState(null); // State for tracking which submenu is open
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

  const handleMenuClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSubmenuIndex(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSubmenuIndex(null);
  };

  const toggleDrawer = (open) => () => {
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
          <ListItem button key={item.name} component={Link} to={item.path}>
            {item.name}
          </ListItem>
        ))}
        {user && (
          <ListItem button onClick={logout}>
            Logout
          </ListItem>
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
