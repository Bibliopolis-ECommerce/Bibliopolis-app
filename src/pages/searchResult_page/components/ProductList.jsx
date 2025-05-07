import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import ItemCard from './ItemCard';
import apiService from '../../../services/ZooZoneAPIService';

const ProductList = ({ param, priceRange, selectedCategories, selectedStars }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchSearchItems = async () => {
      try {
        if (param) {
          console.log('param:', param);
          const searchResults = await apiService.getSearchItems(param);
          console.log('searchResults:', searchResults);
          // Ajoutez l'attribut stars aléatoire à chaque produit
          const productsWithStars = searchResults.map(product => ({
            ...product,
            stars: Math.floor(Math.random() * 3) + 3 // Génère un nombre aléatoire entre 3 et 5
          }));
          setProducts(productsWithStars);
        }
      } catch (error) {
        console.error('Failed to fetch search items:', error);
      }
    };

    fetchSearchItems();
  }, [param]);

  useEffect(() => {
    console.log('priceRange:', priceRange);
    console.log('selectedCategories:', selectedCategories);
    console.log('selectedStars:', selectedStars);
  }, [priceRange, selectedCategories, selectedStars]);

  const filteredProducts = products.filter((product) => {
    const withinPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
    const withinSelectedCategories = selectedCategories.length === 0 || selectedCategories.includes(product.category.EN);
    const withinSelectedStars = selectedStars === 0 || product.stars >= selectedStars;
    return withinPriceRange && withinSelectedCategories && withinSelectedStars;
  });

  console.log('filteredProducts:', filteredProducts);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Result for : {param}
      </Typography>
      <Grid container spacing={2}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ItemCard item={product} />
            </Grid>
          ))
        ) : (
          <Typography sx={{ mt: 2 }} variant="h6" gutterBottom>
            No product found.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default ProductList;
