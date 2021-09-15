/**
 * File exports login button.
 */
import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

const LoginButton = () => (
  <Grid container spacing={2}>
    <Grid item xs={6}>
      <Link to="/login" style={{ textDecoration: 'none' }}>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          style={{ whiteSpace: 'nowrap' }}
        >
          Log In
        </Button>
      </Link>
    </Grid>
  </Grid>
);

export default LoginButton;
