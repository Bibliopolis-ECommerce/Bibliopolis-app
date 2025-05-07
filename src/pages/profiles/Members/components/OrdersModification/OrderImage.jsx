import React from 'react';
import { Box } from '@mui/material';

const OrderImage = ({ image }) => {
  return (
    <Box component="img" src={image} alt="Order item" sx={{ width: 100, height: 100 }} />
  );
};

export default OrderImage;
