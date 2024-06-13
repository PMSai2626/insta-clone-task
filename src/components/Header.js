// src/components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="md">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Instagram Clone Frontend Assignment
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
