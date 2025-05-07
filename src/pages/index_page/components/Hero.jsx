import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Box, Paper } from '@mui/material';
import HeroData from '../../../mock/Hero.json';

const HeroItem = ({ item }) => {
  return (
    <Paper
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        width: '100%',
        height: '100%',
      }}
    >
      <img width={940} height={500} src={item.image} alt={item.name} />
    </Paper>
  );
};

const Hero = () => {
  return (
    <>
      <Box
        sx={{
          mt: 20,
          width: '80%',
          height: '50vh',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <Carousel
          sx={{ width: '100%', height: '90%' }}
          navButtonsAlwaysVisible={true}
          indicators={false}
        >
          {HeroData.map((item, i) => (
            <HeroItem key={i} item={item} />
          ))}
        </Carousel>
      </Box>
    </>
  );
};

export default Hero;
