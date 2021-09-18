/**
 * File exports register button
 */
import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

const RegisterButton = () => (
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
  </Grid>
);

export default RegisterButton;
