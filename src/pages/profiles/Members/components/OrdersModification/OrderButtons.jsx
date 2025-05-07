import React, { useState, useContext } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from '@mui/material';
import SingleOrderDetail from './SingleOrderDetails';
import apiService from '../../../../../services/ZooZoneAPIService';
import useCart from '../../../../../context/hooks/useCart';
import { LanguageContext } from '../../../../../context/AppContext';
import OrdersButton from '../../../../../lang/OrdersButton.json'

const OrderButtons = ({ order }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const { language } = useContext(LanguageContext);

  const { clearCart } = useCart();

  const handleClickOpen = () => {
    setShowDetail(true);
  };

  const handleClose = () => {
    setShowDetail(false);
  };

  const handleOrderClick = async () => {
 

    try {
      const response = await apiService.createOrder(order, language);
      setSnackbarMessage(response.message);
      setSnackbarSeverity('success');
      clearCart();
    } catch (error) {
      setSnackbarMessage('Failed to process order');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  return (
    <Box display="flex" justifyContent="flex-end" mt={2}>
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={handleOrderClick} 
        sx={{ 
          color: 'white', 
          ml: 2, 
          padding: '12px 24px', 
          fontSize: '16px', 
          minWidth: '150px' 
        }}
      >
        {OrdersButton.orders_button['buy-again'][language]}
      </Button>
      <Button 
        variant="outlined" 
        color="secondary" 
        onClick={handleClickOpen} 
        sx={{ ml: 2 }}
      >
        {OrdersButton.orders_button['view-details'][language]}
      </Button>

      <Dialog open={showDetail} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{OrdersButton.orders_button['delivery-status'][language]}</DialogTitle>
        <DialogContent>
          <SingleOrderDetail order={order} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {OrdersButton.orders_button['Quit'][language]}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} variant="filled" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OrderButtons;
