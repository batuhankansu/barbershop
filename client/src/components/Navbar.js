import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          Barbershop
        </Typography>
        <Box>
          <Button
            color="inherit"
            component={RouterLink}
            to="/book"
          >
            Book Appointment
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/admin"
          >
            Admin
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 