import React from 'react';
import { Box, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const slides = [
  { title: 'Explore Thousands of Books', image: '/assets/slider1.jpg' },
  { title: 'Curated for Every Reader', image: '/assets/slider2.jpg' },
  { title: 'Fast Delivery, Fair Prices', image: '/assets/slider3.jpg' },
  { title: 'Join Our Community of Book Lovers', image: '/assets/slider4.jpg' },
  { title: 'Discover Your Next Favorite Book', image: '/assets/slider5.jpg' },
];

export const HeroSlider: React.FC = () => {
  return (
    <Box>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: { xs: 250, sm: 400 },
                overflow: 'hidden',
              }}
            >
              <Box
                component="img"
                src={slide.image}
                alt={slide.title}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: '#fff',
                  bgcolor: 'rgba(0,0,0,0.6)',
                  p: 2,
                  borderRadius: 2,
                  textAlign: 'center',
                  fontSize: { xs: '1.5rem', sm: '2.5rem' },
                }}
              >
                {slide.title}
              </Typography>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
