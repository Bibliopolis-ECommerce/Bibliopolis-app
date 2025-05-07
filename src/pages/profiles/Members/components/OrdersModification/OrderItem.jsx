import React from 'react';
import { Box, Typography, Card, Grid } from '@mui/material';
import OrderImage from './OrderImage';
import OrderText from './OrderText';
import OrderButtons from './OrderButtons';

const OrderItem = ({ order }) => {
  return (
    <Card sx={{ p: 2, mb: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <OrderImage image={order.items[0].image} />
        </Grid>
        <Grid item xs={12} md={6}>
          <OrderText order={order} />
        </Grid>
        <Grid item xs={12} md={3}>
          <OrderButtons order={order}/>
        </Grid>
      </Grid>
    </Card>
  );
};

export default OrderItem;
