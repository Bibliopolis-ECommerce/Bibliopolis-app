import React, { useContext, useState, useEffect } from 'react';
import { IconButton, Snackbar, Alert } from '@mui/material';
import { Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon } from '@mui/icons-material';
import { AuthContext } from '../../../context/AuthContext';
import apiService from '../../../services/ZooZoneAPIService';
import useLanguage from '../../../context/hooks/useLanguage';
import wishlistData from '../../../lang/WishList.json';
import Cookies from 'js-cookie';

const AddToWishlistButton = ({ productId }) => {
  const { userData } = useContext(AuthContext);
  const { language } = useLanguage();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isInWishlist, setIsInWishlist] = useState(false);
  const wishlistText = wishlistData.wishlist;
  const token = Cookies.get('token');

  useEffect(() => {
    const checkIfInWishlist = async () => {
      if (userData) {
        try {
          
          const response = await apiService.getWishlist(token);
          const wishlistItems = response.data;
          const inWishlist = wishlistItems.some(item => item.id === productId);
          setIsInWishlist(inWishlist);
        } catch (error) {
          console.error('Failed to check wishlist status:', error);
        }
      }
    };
    checkIfInWishlist();
  }, [userData, productId, token]);

  const handleToggleWishlist = async () => {
    if (!userData) {
      setSnackbarMessage(wishlistText.notLoggedIn[language]);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    try {
      if (isInWishlist) {
        await apiService.removeFromWishlist(productId);
        setSnackbarMessage(wishlistText.removedFromWishlist[language]);
        setIsInWishlist(false);
      } else {
        await apiService.addToWishlist(productId);
        setSnackbarMessage(wishlistText.addedToWishlist[language]);
        setIsInWishlist(true);
      }
      setSnackbarSeverity('success');
    } catch (error) {
      console.error('Failed to update wishlist:', error);
      setSnackbarMessage(wishlistText.failedToUpdate[language]);
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleToggleWishlist}>
        {isInWishlist ? <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon color="secondary" />}
      </IconButton>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} variant="filled" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddToWishlistButton;
