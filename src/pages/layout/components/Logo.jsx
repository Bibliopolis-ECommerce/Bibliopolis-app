import React from 'react';
import { Box, Typography } from '@mui/material';
import { Pets } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Logo = () => {
  return (
    <Box
      component={RouterLink}
      to="/"
      display="flex"
      alignItems="center"
      sx={{ mr: 2, textDecoration: 'none', color: 'inherit' }}
    >
      <Pets
        sx={{ color: 'secondary.main', display: { xs: 'block', sm: 'block' } }}
      />
      <Typography
        variant="h6"
        sx={{ color: 'secondary.main', display: { xs: 'none', sm: 'block' } }}
      >
        ZooZone
      </Typography>
    </Box>
  );
};

export default Logo;
