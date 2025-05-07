import React, { useContext, useState, useEffect } from 'react';
import { Box, Typography, Button, Card, IconButton, Grid, CssBaseline, Alert, Snackbar } from '@mui/material';
import { Delete as DeleteIcon, ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Navbar from '../../../../layout/Navbar';
import Footer from '../../../../layout/Footer';
import { LanguageContext } from '../../../../../context/AppContext';
import wishlistData from '../../../../../lang/WishList.json';
import { lightTheme } from '../../../../../context/theme';
import apiService from '../../../../../services/ZooZoneAPIService';
import { AuthContext } from '../../../../../context/AuthContext';
import useCart from '../../../../../context/hooks/useCart';

import Cookies from 'js-cookie';

const WishlistDetails = () => {
  const { userData } = useContext(AuthContext);
  const [wishlistItems, setWishlistItems] = useState([]);
  const { language } = useContext(LanguageContext);
  const wishlistText = wishlistData.wishlist;
  const token = Cookies.get('token'); 
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const { addToCart } = useCart();


  useEffect(() => {
    if (userData) {
      apiService.getWishlist(token)
        .then((data) => {
          setWishlistItems(data.data);
        })
        .catch((error) => {
          console.error('Failed to fetch wishlist:', error);
        });
    }
  }, [userData, token]);

  const handleRemoveClick = (productId) => {
    apiService.removeFromWishlist(productId)
      .then(() => {
        setWishlistItems((prevItems) => prevItems.filter(item => item.id !== productId));
        setSnackbarMessage(wishlistText.removedFromWishlist[language]);
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      })
      .catch((error) => {
        console.error('Failed to remove product from wishlist:', error);
        setSnackbarMessage(wishlistText.failedToUpdate[language]);
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };
  const handleAddToCartClick = (item) => {
    const product = {
      id: item.id,
      name: item[`Name_${language}`],
      price: item.Price,
      image: item.image,
      quantity: 1,
      size: item[`Size_${language}`],
    };
    

    addToCart(product);
    setSnackbarMessage(wishlistText.addedToCart[language]);
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <CssBaseline />
      <Navbar />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <Box sx={{ flexGrow: 1, p: 3 }}>
          {wishlistItems.length === 0 ? (
            <Typography variant="h5" component="h3" align="center">
              {wishlistText.emptyMessage[language]}
            </Typography>
          ) : (
            <Card elevation={3} sx={{ p: 3, margin: '20px auto', maxWidth: '900px' }}>
              <Typography variant="h4" gutterBottom>
                {wishlistText.title[language]}
              </Typography>
              <Grid container spacing={2}>
                {wishlistItems.map((item) => (
                  <Grid item xs={12} key={item.id}>
                   <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                    <Box
                      component={Link}
                      to={`/productPage/${item.id}`}
                      sx={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', flexGrow: 1 }}
                    >
                      <Box component="img" src={item.image} alt={item[`Name_${language}`]} sx={{ width: 100, height: 100, marginRight: 2 }} />
                      <Typography variant="h6">{item[`Name_${language}`]}</Typography>
                    </Box >
                    <Button
  variant="contained"
  sx={{ 
    color: 'white', 
    backgroundColor: lightTheme.palette.secondary.main, 
    fontSize: '16px', 
    transition: 'all 0.3s ease', 
    cursor: 'pointer' 
  }}
  color="secondary"
  startIcon={<ShoppingCartIcon />}
  onClick={() => handleAddToCartClick(item)} 
>
  {wishlistText.toBuyButton[language]}
</Button>
<IconButton 
  aria-label={wishlistText.deleteButton[language]} 
  onClick={() => handleRemoveClick(item.id)}
  sx={{ cursor: 'pointer' }} 
>
  <DeleteIcon />
</IconButton>

                  </Card>
                  </Grid>
                ))}
              </Grid>
            </Card>
          )}
        </Box>
        <Footer sx={{ mt: 'auto' }} />
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} variant="filled" sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default WishlistDetails;
