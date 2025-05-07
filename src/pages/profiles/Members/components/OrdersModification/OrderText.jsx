import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import {LanguageContext} from '../../../../../context/AppContext';
import OrdersButton from '../../../../../lang/OrdersButton.json'

const OrderText = ({ order }) => {
  const { language } = useContext(LanguageContext);
  return (
    <Box>
      <Typography variant="h6">
        {OrdersButton.orders_button['order-date'][language]}: {new Date(order.orderDate).toLocaleDateString()}
      </Typography>
      <Typography variant="body2">
        {OrdersButton.orders_button['delivery-date'][language]}: {new Date(order.deliveryDate).toLocaleDateString()}
      </Typography>
      <Typography variant="body2">
        {OrdersButton.orders_button['delivery-status'][language]}: {order[`status_${language}`]}
      </Typography>
      <Typography variant="body2">
        {OrdersButton.orders_button['total-price'][language]}: $ {order.total.toFixed(2)}
      </Typography>
    </Box>
  );
};

export default OrderText;
