import React, { useContext, useEffect, useState } from 'react';
import { Box, CssBaseline, Container, Typography } from '@mui/material';
import Navbar from '../../../../layout/Navbar';
import Footer from '../../../../layout/Footer';
import OrderItem from './OrderItem';
import apiService from '../../../../../services/ZooZoneAPIService';
import { AuthContext } from '../../../../../context/AuthContext';
import Cookies from 'js-cookie';

const OrdersDetails = () => {
  const { userData } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const token = Cookies.get('token');

  useEffect(() => {
    if (userData) {
      apiService.getOrders(token)
        .then((data) => {
          setOrders(data.data);
        })
        .catch((error) => {
          console.error('Failed to fetch orders:', error);
        });
    }
  }, [userData, token]);

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Container maxWidth="md" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
          {orders.length === 0 ? (
            <Typography variant="h5" align="center">No orders found.</Typography>
          ) : (
            orders.map((order) => (
              <OrderItem key={order.order_id} order={order} />
            ))
          )}
        </Container>
        <Footer />
      </Box>
    </>
  );
};

export default OrdersDetails;