// in src/components/MainPage.tsx
import React from 'react';
import Box from '@mui/material/Box';
import { HeroSlider } from './HeroSlider';
import { BookCategoryCards } from './BookCategoryCards';

export const MainPage: React.FC = () => (
  <Box>
    {/* push the slider down a bit */}
    <Box mt={{ xs: 2, sm: 8.5 }}>  
      <HeroSlider />
    </Box>

    <BookCategoryCards  />
  </Box>
);
