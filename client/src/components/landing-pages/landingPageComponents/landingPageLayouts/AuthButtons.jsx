import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

const AuthButtons = () => (
  <Grid container spacing={2}>
    <Grid item xs={6}>
      <Link to="/register" style={{ textDecoration: 'none' }}>
        <Button
          variant="contained"
          size="large"
          color="primary"
        >
          Register
        </Button>
      </Link>
    </Grid>
    <Grid item xs={6}>
      <Link to="/login" style={{ textDecoration: 'none' }}>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          style={{ color: 'white' }}
        >
          Log In
        </Button>
      </Link>
    </Grid>
  </Grid>
);

export default AuthButtons;
