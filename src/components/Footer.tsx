// src/components/Footer.tsx
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const Footer: React.FC = () => (
  <Box
    component="footer"
    sx={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      bgcolor: 'background.paper',
      py: 2,
      textAlign: 'center',
      boxShadow: 1,
    }}
  >
    <Typography variant="body2" color="textSecondary">
      © {new Date().getFullYear()} Bibliopolis — All rights reserved.
    </Typography>
  </Box>
);
