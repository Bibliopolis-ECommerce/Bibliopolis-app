import React, { useContext } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Typography, Box } from '@mui/material';
import { LanguageContext } from '../../../context/AppContext';
import ItemCard from './ItemCard';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1500 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1500, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 660 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 660, min: 0 },
    items: 2,
  },
};
{/*({ data }) */}
const MultiCarousel = ({CarouselData=[]}) => {
  const { language } = useContext(LanguageContext);

  return (
    <>
      {CarouselData.map((category) => (
        <Box key={category.id} sx={{ margin: 2 }}>
          <Typography sx={{ margin: 4 }} variant="h5">
            {category.categoryName[language]}
          </Typography>
          <Carousel responsive={responsive}>
            {category.categoryItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </Carousel>
        </Box>
      ))}
    </>
  );
};

export default MultiCarousel;