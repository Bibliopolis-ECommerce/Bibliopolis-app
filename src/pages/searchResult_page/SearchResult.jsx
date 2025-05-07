import { useState } from 'react';
import { CssBaseline, Box, Container } from '@mui/material';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import Filter from './components/Filter';
import ProductList from './components/ProductList';
import { useParams } from 'react-router-dom';

const SearchResult = () => {
  const { query } = useParams();
  const [priceRange, setPriceRange] = useState([20, 80]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedStars, setSelectedStars] = useState(0);

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Container sx={{ flexGrow: 1, display: 'flex' }}>
          <Box sx={{ width: '25%', borderRight: '1px solid #ddd' }}>
            <Filter 
              onPriceChange={setPriceRange}
              onCategoryChange={setSelectedCategories}
              onStarsChange={setSelectedStars}
            />
          </Box>
          <Box sx={{ width: '75%' }}>
            <ProductList 
              param={query} 
              priceRange={priceRange} 
              selectedCategories={selectedCategories} 
              selectedStars={selectedStars}
            />
          </Box>
        </Container>
        <Footer />
      </Box>
    </>
  );
};

export default SearchResult;
