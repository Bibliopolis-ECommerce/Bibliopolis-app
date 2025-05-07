import { useState } from 'react';
import { Box, Typography, Button, Slider, useTheme } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';

const Filter = ({ onPriceChange, onCategoryChange, onStarsChange }) => {
  const theme = useTheme();
  const [price, setPrice] = useState([0, 80]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedStars, setSelectedStars] = useState(0);

  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
    onPriceChange(newValue);
  };

  const handleCategoryClick = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((item) => item !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updatedCategories);
    onCategoryChange(updatedCategories);
  };

  const handleStarClick = (stars) => {
    setSelectedStars(stars);
    onStarsChange(stars);
  };

  const valueLabelFormat = (value) => {
    return `$${value}`;
  };

  const renderStar = (filled) =>
    filled ? (
      <Star
        sx={{
          color: '#FFD700',
          stroke: '#FFD700',
          strokeWidth: 0.2,
        }}
      />
    ) : (
      <StarBorder
        sx={{
          color: '#FFD700',
          stroke: '#FFD700',
          strokeWidth: 0.2,
        }}
      />
    );

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
        Category
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1, mb: 2 }}>
        {[
          'Dog Food',
          'Cat Food',
          'Reptile Food',
          'Fish Food',
          'Dog Treats',
          'Cat Treats',
          'Dog Toys',
          'Cat Toys',
          'Dog Beds',
        ].map((category) => (
          <Button
            key={category}
            variant={
              selectedCategories.includes(category) ? 'contained' : 'outlined'
            }
            onClick={() => handleCategoryClick(category)}
            sx={{
              borderRadius: '20px',
              textTransform: 'none',
              padding: '5px 10px',
              backgroundColor: selectedCategories.includes(category)
                ? theme.palette.button.selected
                : theme.palette.button.default,
              color: selectedCategories.includes(category)
                ? theme.palette.primary.contrastText
                : theme.palette.text.primary,
              borderColor: theme.palette.secondary.main,
              borderWidth: '1px',
              '&:hover': {
                backgroundColor: theme.palette.button.hover,
                borderColor: theme.palette.secondary.main,
              },
            }}
          >
            {category}
          </Button>
        ))}
      </Box>

      <Typography variant="h6">Customer Review</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
        {[1, 2, 3, 4, 5].map((rating) => (
          <Button
            key={rating}
            onClick={() => handleStarClick(rating)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: 0,
              minWidth: 'auto',
              textTransform: 'none',
              backgroundColor: 'transparent',
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
          >
            {renderStar(selectedStars >= rating)}
          </Button>
        ))}
        <Typography variant="p" sx={{ ml: 1 }}>
          & Up
        </Typography>
      </Box>

      <Typography variant="h6" sx={{ mt: 2 }}>
        Price
      </Typography>
      <Typography>{`$${price[0]} - $${price[1]}`}</Typography>
      <Slider
        value={price}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        valueLabelFormat={valueLabelFormat}
        min={0}
        max={200}
        sx={{
          mt: 1,
          color: theme.palette.secondary.main,
          '& .MuiSlider-thumb': {
            borderColor: theme.palette.secondary.main,
          },
          '& .MuiSlider-track': {
            borderColor: theme.palette.secondary.main,
          },
          '& .MuiSlider-rail': {
            borderColor: theme.palette.secondary.main,
          },
        }}
      />
      <Button
        variant="contained"
        color="secondary"
        sx={{ mt: 2, color: 'white' }}
      >
        Apply
      </Button>
    </Box>
  );
};

export default Filter;
