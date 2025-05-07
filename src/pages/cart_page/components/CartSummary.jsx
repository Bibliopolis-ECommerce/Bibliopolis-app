import React, { useContext, useState } from 'react';
import useCart from '../../../context/hooks/useCart';
import {
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  TextField,
  Divider,
  Snackbar,
  Alert
} from '@mui/material';
import { useTheme } from '@emotion/react';
import { LanguageContext } from '../../../context/AppContext';
import apiService from '../../../services/ZooZoneAPIService';
import Translations from '../../../lang/CartSummary.json';

const CartSummary = () => {
  const { cart, clearCart } = useCart();
  const { language } = useContext(LanguageContext);
  const theme = useTheme();
  const [shipping, setShipping] = useState('standard');
  const [promoCode, setPromoCode] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const GST_RATE = 0.05;
  const QST_RATE = 0.09975;

  const calculateSubtotal = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTaxes = (subtotal) => {
    const gst = subtotal * GST_RATE;
    const qst = subtotal * QST_RATE;
    return { gst, qst };
  };

  const calculateTotal = (subtotal, taxes) => {
    return subtotal + taxes.gst + taxes.qst;
  };

  const handleOrderClick = async () => {
    const subtotal = calculateSubtotal(cart);
    const taxes = calculateTaxes(subtotal);
    const total = calculateTotal(subtotal, taxes);

    try {
      const orderData = {
        items: cart,
        subtotal,
        taxes,
        total,
        shipping,
        promoCode,
      };
      const response = await apiService.createOrder(orderData, language);
      setSnackbarMessage(response.message);
      setSnackbarSeverity('success');
      clearCart();
    } catch (error) {
      setSnackbarMessage('Failed to process payment');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const subtotal = calculateSubtotal(cart);
  const taxes = calculateTaxes(subtotal);
  const total = calculateTotal(subtotal, taxes);

  return (
    <Box
      sx={{
        p: 2,
        border: '1px solid',
        borderColor: 'grey.500',
        borderRadius: 2,
        backgroundColor: theme.palette.CartSummary.backgroundColor,
        color: theme.palette.CartSummary.color,
      }}
    >
      <Typography variant="h5" gutterBottom>
        {Translations.cart_summary.summary[language]}
      </Typography>
      <Box>
        {cart.map((item, index) => (
          <Box key={index} display="flex" justifyContent="space-between" mb={1}>
            <Box display="flex" alignItems="center">
              <img
                src={item.image}
                alt={item.name[language]}
                style={{ width: 50, height: 50, marginRight: 16 }}
              />
              <Typography variant="body1">
                {item.name[language]} x {item.quantity}
              </Typography>
            </Box>
            <Typography variant="body1">
              $ {(item.price * item.quantity).toFixed(2)}
            </Typography>
          </Box>
        ))}
      </Box>
      <Divider sx={{ my: 2 }} />
      <Typography variant="body1" gutterBottom>
        {Translations.cart_summary.shipping[language]}
      </Typography>
      <Select
        fullWidth
        value={shipping}
        onChange={(e) => setShipping(e.target.value)}
        MenuProps={{
          PaperProps: {
            sx: {
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
            },
          },
        }}
      >
        <MenuItem value="standard">{Translations.cart_summary.standard[language]}</MenuItem>
        <MenuItem value="express">{Translations.cart_summary.express[language]}</MenuItem>
      </Select>
      <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
        {Translations.cart_summary.promo_code[language]}
      </Typography>
      <TextField
        fullWidth
        placeholder={Translations.cart_summary.enter_code[language]}
        variant="outlined"
        value={promoCode}
        onChange={(e) => setPromoCode(e.target.value)}
      />
      <Divider sx={{ my: 2 }} />
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body1">{Translations.cart_summary.subtotal[language]}</Typography>
        <Typography variant="body1">${subtotal.toFixed(2)}</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body1">{Translations.cart_summary.gst[language]}</Typography>
        <Typography variant="body1">${taxes.gst.toFixed(2)}</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body1">{Translations.cart_summary.qst[language]}</Typography>
        <Typography variant="body1">${taxes.qst.toFixed(2)}</Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body1">{Translations.cart_summary.total_price[language]}</Typography>
        <Typography variant="body1">${total.toFixed(2)}</Typography>
      </Box>
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        sx={{ mt: 2, color: 'white' }}
        onClick={handleOrderClick}
      >
        {Translations.cart_summary.order_button[language]}
      </Button>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} variant="filled" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CartSummary;
