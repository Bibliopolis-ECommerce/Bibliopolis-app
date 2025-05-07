import React, { useContext, useState } from 'react';
import {
  Box,
  Typography,
  Snackbar,
  Alert,
  Button,
  Modal,
} from '@mui/material';
import useCart from '../../../context/hooks/useCart';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import SignInModal from '../../auth_page/components/SignInModal'; 

const CartList = () => {
  const { cart, addToCart, removeFromCart, getCartItemCount, removeAllSameItem } = useCart();
  const { userData } = useContext(AuthContext); 
  const navigate = useNavigate();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [showSignInModal, setShowSignInModal] = useState(false); 

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleCheckout = () => {
    if (!userData) {
      setShowSignInModal(true); 
    } else {
      navigate('/summary'); 
    }
  };

  const handleSignInSuccess = () => {
    setShowSignInModal(false);
    navigate('/summary');
  };

  return (
    <>
      {getCartItemCount() === 0 ? (
        <Typography variant="subtitle1" align="center">
          No items in cart.
        </Typography>
      ) : (
        <>
          {cart.map((item, index) => (
            <CartItem
              key={item.id}
              item={item}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              isFirstItem={index === 0}
              isLastItem={index === cart.length - 1}
              removeAllSameItem={removeAllSameItem}
            />
          ))}
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                color: 'white',
                ml: 2,
                width: '100px',
                height: '40px',
              }}
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          </Box>
        </>
      )}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} variant="filled" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Modal
        open={showSignInModal}
        onClose={() => setShowSignInModal(false)}
        aria-labelledby="modal-signin-title"
        aria-describedby="modal-signin-description"
      >
        <SignInModal onSuccess={handleSignInSuccess} />
      </Modal>
    </>
  );
};

export default CartList;
