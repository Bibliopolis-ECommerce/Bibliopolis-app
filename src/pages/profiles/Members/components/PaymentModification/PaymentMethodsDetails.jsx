import { useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Box, Typography, Button, Paper, Snackbar, Alert } from '@mui/material';
import Navbar from '../../../../layout/Navbar';
import Footer from '../../../../layout/Footer';
import PaymentMethodsEdit from './PaymentMethodsEdit';
import { LanguageContext } from '../../../../../context/AppContext';
import paymentInfoData from '../../../../../lang/PaymentInfo.json';
import { lightTheme } from '../../../../../context/theme';
import apiService from '../../../../../services/ZooZoneAPIService';
import { AuthContext } from '../../../../../context/AuthContext';

const PaymentMethodsDetails = () => {
  const { language } = useContext(LanguageContext);
  const { userData } = useContext(AuthContext);
  const [isEditMode, setIsEditMode] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      if (userData && userData.member && userData.member.email) {
        const token = Cookies.get('token'); 

        try {
          const response = await apiService.getPaymentMethods(userData.member.email,token);
          setPaymentData(response.data);
        } catch (error) {
          console.error('Failed to fetch payment methods:', error);
          setPaymentData({
            cardNumber: 'N/A',
            expiryDate: 'N/A',
            cvv: 'N/A'
          });
        }
      }
    };

    fetchPaymentMethods();
  }, [userData]);

  const handleModifyClick = () => {
    setIsEditMode(true);
  };

  const handleCancelClick = () => {
    setIsEditMode(false);
  };

  const handleSaveClick = async (updatedPayment) => {
    const token = Cookies.get('token'); 

  
    try {
      const response = await apiService.updatePaymentMethods(updatedPayment, token);
      setPaymentData(updatedPayment);
      setIsEditMode(false);
      setSnackbarMessage(response.message);
      setSnackbarSeverity('success');
      setTimeout(() => {
        setSnackbarOpen(false);
      }, 3000);
    } catch (error) {
      console.error('Failed to update payment methods:', error);
      setSnackbarMessage('Failed to update payment methods');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const paymentInfo = paymentInfoData.paymentInfo;

  if (!paymentData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Box sx={{ flexGrow: 1, p: 3 }}>
          {isEditMode ? (
            <PaymentMethodsEdit paymentMethods={paymentData} onCancel={handleCancelClick} onSave={handleSaveClick} />
          ) : (
            <Paper
              elevation={3}
              sx={{
                p: 3,
                margin: '20px auto',
                maxWidth: '600px',
              }}
            >
              <Typography variant="h4" gutterBottom>
                {paymentInfo.title[language]}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="h6">{paymentInfo.cardNumber[language]}</Typography>
                  <Typography variant="body1">{paymentData.cardNumber.replace(/\d(?=\d{4})/g, '*')}</Typography>
                </Box>
                <Box>
                  <Typography variant="h6">{paymentInfo.expiryDate[language]}</Typography>
                  <Typography variant="body1">{paymentData.expiryDate}</Typography>
                </Box>
                <Button
                  variant="contained"
                  sx={{
                    color: 'white',
                    backgroundColor: lightTheme.palette.secondary.main,
                    fontSize: '16px',
                    transition: 'all 0.3s ease',
                  }}
                  color="secondary"
                  onClick={handleModifyClick}
                >
                  {paymentInfo.modifyButton[language]}
                </Button>
              </Box>
            </Paper>
          )}
        </Box>
        <Footer sx={{ mt: 'auto' }} />
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default PaymentMethodsDetails;
