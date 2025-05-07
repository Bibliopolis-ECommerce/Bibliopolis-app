import React, { useContext } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Typography, Box } from '@mui/material';
import CarouselData from '../../../mock/Carousel.json';
import { LanguageContext } from '../../../context/AppContext';
import ItemCard from '../../index_page/components/ItemCard';
import ProductLang from '../../../lang/Product.json'

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

const Suggestion = ({ categoryId, productId }) => {
  const { language } = useContext(LanguageContext);
  const category = CarouselData.find((category) => category.id == categoryId);
  const filteredItems = category?.categoryItems.filter(
    (item) => item.id !== productId,
  );

  return (
    <>
      <Box key={category?.id} sx={{ margin: 2 }}>
        <Typography sx={{ margin: 4 }} variant="h5">
          {ProductLang.Suggestions[language]} :
        </Typography>
        <Carousel responsive={responsive}>
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </Carousel>
      </Box>
    </>
  );
};

export default Suggestion;
