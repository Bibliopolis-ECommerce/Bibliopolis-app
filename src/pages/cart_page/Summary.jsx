import React from 'react';
import { CssBaseline, Container, Grid } from '@mui/material';
import Navbar from '../layout/Navbar';
import CartSummary from './components/CartSummary';
const Summary = () => {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={10} lg={10}>
            <CartSummary />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Summary;
