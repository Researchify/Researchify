/**
 * File exports add button
 */
 import React from 'react';
 import { Button, Grid } from '@material-ui/core';
 import { Link } from 'react-router-dom';
 
 const AddButton = () => (
   <Grid container spacing={2}>
     <Grid item xs={6}>
         <Button 
           variant="contained"
           size="large"
           color="primary"
         >
           Add Achievement
         </Button>
     </Grid>
   </Grid>
 );
 
 export default AddButton;