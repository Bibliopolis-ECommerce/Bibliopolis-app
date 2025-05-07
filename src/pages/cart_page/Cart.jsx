import React from 'react';
import {
  CssBaseline,
  Container,
  Grid,
  Typography,
  Box,
  Button,
} from '@mui/material';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import { Link as RouterLink } from 'react-router-dom';
import CartList from './components/CartList';

const Cart = () => {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        <Navbar />
        <Box sx={{ flexGrow: 1 }}>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={10} lg={10}>
                <Typography variant="h4" gutterBottom>
                  Shopping Cart
                </Typography>
                <CartList />
              </Grid>
            </Grid>
            <Box sx={{ mt: 4 }} component={RouterLink} to="/">
              <Button variant="text" color="secondary">
                &larr; Back to shop
              </Button>
            </Box>
          </Container>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default Cart;
