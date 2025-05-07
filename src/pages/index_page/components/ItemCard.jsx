import React, { useState, useContext } from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  IconButton,
  Snackbar,
  Alert,
  CardActionArea,
  CardActions,
} from '@mui/material';
import { Star, StarBorder, Favorite } from '@mui/icons-material';
import useCart from '../../../context/hooks/useCart';
import IndexData from '../../../lang/Index.json';
import { LanguageContext } from '../../../context/AppContext';

const renderStars = (stars, reviewsNumber) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
      {[1, 2, 3, 4, 5].map((star) =>
        stars >= star ? (
          <Star key={star} sx={{ color: '#FFD700', fontSize: 20 }} />
        ) : (
          <StarBorder key={star} sx={{ color: '#FFD700', fontSize: 20 }} />
        ),
      )}
      <Typography sx={{ ml: 1, color: 'text.secondary' }}>
        ({reviewsNumber})
      </Typography>
    </Box>
  );
};

const ItemCard = ({ item }) => {
  const { language } = useContext(LanguageContext);
  const { addToCart } = useCart();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    
    const product = {
      id: item.id,
      name: item.name[language],
      price: item.price,
      image: item.image,
      quantity: 1,
      size:item.size[language],
    };
    

    addToCart(product);
    setShowSnackbar(true);
    setAddedToCart(true); 

    setTimeout(() => {
      setShowSnackbar(false);
      setAddedToCart(false); 
    }, 3000);
  };

  const handleCardClick = () => {
    window.location.assign(`/productPage/${item.id}`);
  };

  return (
    <>
      <Card sx={{ maxWidth: 200 }}>
        <CardActionArea onClick={handleCardClick} sx={{ paddingBottom: 0 }}>
          <CardMedia
            component="img"
            height="140"
            image={item.image}
            alt={item.name[language]}
          />
          <CardContent sx={{ textAlign: 'center', paddingBottom: 0 }}>
            <Typography
              variant="h6"
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: 'block',
                maxWidth: '100%',
                textAlign: 'center'
              }}
            >
              {item.name[language]}
            </Typography>
            {/* renderStars(item.rating, item.reviewsNumber) */}
            {renderStars(4, 1)} 
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
              <Typography>{item.price} $</Typography>
            </Box>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: '8px' }}>
          <Button
            color="secondary"
            variant="contained"
            sx={{
              color: 'white',
              transition: 'all 0.3s ease',
              marginRight: '8px',
            }}
            onClick={handleAddToCart}
          >
            {addedToCart ? IndexData.confirmation_added[language] : IndexData.addToCart_button[language]}
          </Button>
          {/* <IconButton sx={{ width: '40px', height: '40px', color: '#f50057' }}>
            <Favorite />
          </IconButton> */}
        </CardActions>
      </Card>

      {/* <Snackbar open={showSnackbar} autoHideDuration={3000} onClose={() => setShowSnackbar(false)}>
        <Alert onClose={() => setShowSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Product successfully added to your shopping cart
        </Alert>
      </Snackbar> */}
    </>
  );
};

export default ItemCard;
