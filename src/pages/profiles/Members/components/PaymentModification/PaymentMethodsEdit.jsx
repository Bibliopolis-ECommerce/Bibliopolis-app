import React, { useContext, useState } from 'react';
import { Box, Typography, Button, Card, CardContent, TextField } from '@mui/material';
import { LanguageContext } from '../../../../../context/AppContext';
import paymentInfoData from '../../../../../lang/PaymentInfo.json';
import { lightTheme } from '../../../../../context/theme';

const PaymentMethodsEdit = ({ paymentMethods, onCancel, onSave }) => {
  const [paymentData, setPaymentData] = useState(paymentMethods);
  const { language } = useContext(LanguageContext);
  const paymentInfo = paymentInfoData.paymentInfo;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({
      ...paymentData,
      [name]: value,
    });
  };

  const handleSaveClick = () => {
    onSave(paymentData);
  };

  return (
    <Card
      elevation={3}
      sx={{
        p: 3,
        margin: '20px auto',
        maxWidth: '600px',
      }}
    >
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {paymentInfo.editTitle[language]}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label={paymentInfo.cardNumber[language]}
            name="cardNumber"
            value={paymentData.cardNumber}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label={paymentInfo.expiryDate[language]}
            name="expiryDate"
            value={paymentData.expiryDate}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label={paymentInfo.cvv[language]}
            name="cvv"
            type="password"
            value={paymentData.cvv}
            onChange={handleChange}
            fullWidth
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant="outlined"
              sx={{ borderColor: '#f28b82', color: '#f28b82' }}
              onClick={onCancel}
            >
              {paymentInfo.cancelButton[language]}
            </Button>
            <Button
              variant="contained"
              sx={{
                color: 'white',
                backgroundColor: lightTheme.palette.secondary.main,
                fontSize: '16px',
                transition: 'all 0.3s ease',
              }}
              color="secondary"
              onClick={handleSaveClick}
            >
              {paymentInfo.saveButton[language]}
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PaymentMethodsEdit;
