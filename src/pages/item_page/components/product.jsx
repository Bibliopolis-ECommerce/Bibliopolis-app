import React, { useEffect, useState, useContext } from 'react';
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Rating,
  CssBaseline,
} from '@mui/material';
import useLanguage from '../../../context/hooks/useLanguage';
import useCart from '../../../context/hooks/useCart';
import ProductLang from '../../../lang/Product.json';
import apiService from '../../../services/ZooZoneAPIService';
import AddToWishlistButton from './AddToWishListButton';
import { AuthContext } from '../../../context/AuthContext'; 
import ReviewList from './reviewList';


const Product = ({ productId }) => {
  const { language } = useLanguage();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const [mainImage, setMainImage] = useState('');
  const [additionalImages, setAdditionalImages] = useState([]);
  const [fade, setFade] = useState(false);
  const { userData } = useContext(AuthContext); 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await apiService.getProduct(productId);
        setProduct(data);
        setMainImage(data.image);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch product data.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    const item = {
      id: product.id,
      name: product.name[language],
      price: product.price,
      image: product.image,
      quantity: 1,
      size:product.size[language],
    };
    addToCart(item);
  };

  const handleImageClick = (index) => {
    const newMainImage = additionalImages[index];
    const newAdditionalImages = [...additionalImages];
    newAdditionalImages[index] = mainImage;
    setFade(true);
    setTimeout(() => {
      setMainImage(newMainImage);
      setAdditionalImages(newAdditionalImages);
      setFade(false);
    }, 300);
  };

  if (loading) {
    return <Typography variant="h5" component="h3">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h5" component="h3">{error}</Typography>;
  }

  if (!product) {
    return (
      <Typography variant="h5" component="h3">
        {ProductLang.ProductNotFound[language]}
      </Typography>
    );
  }

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: 'flex', mt: 2 }}>
        <Container display="flex">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={mainImage}
                alt={product.name[language]}
                sx={{
                  width: '400px',
                  height: '450px',
                  opacity: fade ? 0 : 1,
                  transition: 'opacity 0.3s ease-in-out',
                }}
              />
              <Grid container sx={{ mt: 2 }} spacing={2}>
                {additionalImages.map((image, index) => (
                  <Grid item xs={3} key={index}>
                    <Box
                      component="img"
                      src={image}
                      alt={`Additional image ${index + 1}`}
                      sx={{
                        width: '100%',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleImageClick(index)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h4" component="h1">
                  {product.name[language]}
                </Typography>
                {userData && <AddToWishlistButton productId={product.id} />}
              </Box>
              <Typography variant="h6" component="h2">
                {product.category[language]}
              </Typography>
              <Box display="flex" alignItems="center" mt={2}>
                <Rating value={product.rating} readOnly />
                <Typography variant="body2" ml={1}>
                  ({product.reviews.length}{ProductLang.Reviews[language]})
                </Typography>
              </Box>
              <Typography variant="body1" mt={2}>
                {product.description[language]}
              </Typography>
              <Box mt={2}>
                <Typography variant="h6" component="h3">
                  {ProductLang.Details[language]}
                </Typography>
                <Typography variant="body1" mt={2}>
                  {ProductLang.Price[language]} : {product.price} $
                </Typography>
                <Typography variant="body1" mt={2}>
                  {ProductLang.InStock[language]} : {product.stock}
                </Typography>
              </Box>
              <Button
                onClick={handleAddToCart}
                variant="contained"
                color="secondary"
                sx={{ color: 'white', mt: 4 }}
                size="large"
              >
                {ProductLang.AddToCart[language]}
              </Button>

              <Box mt={5} sx={{ flexGrow: 1, pd: 2, px: 2}}>
              <ReviewList reviews={product.reviews} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Product;
