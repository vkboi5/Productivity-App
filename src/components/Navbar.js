// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Avatar, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, handleLogout }) => (
  <AppBar position="static" sx={{ backgroundColor: '#171420', borderRadius: 7, marginBottom: 2 }}>
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#f6f6f6' }}>
          Productivity Hub
        </Link>
      </Typography>
      <Box>
        {isLoggedIn ? (
          <>
            <IconButton sx={{ color: 'inherit' }}>
              <Avatar />
            </IconButton>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit">
              <Link to="/login" style={{ textDecoration: 'none', color: '#fff' }}>
                Login
              </Link>
            </Button>
            <Button color="inherit">
              <Link to="/register" style={{ textDecoration: 'none', color: '#fff' }}>
                Register
              </Link>
            </Button>
          </>
        )}
      </Box>
    </Toolbar>
  </AppBar>
);

export default Navbar;
