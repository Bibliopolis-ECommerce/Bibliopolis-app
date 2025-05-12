// src/components/FullBackgroundSection.tsx
import React from 'react';
import { Box, useTheme } from '@mui/material';

type Props = { children: React.ReactNode };

export const FullBackgroundSection: React.FC<Props> = ({ children }) => {
  const theme = useTheme();
  const overlay =
    theme.palette.mode === 'dark'
      ? 'rgba(0,0,0,0.6)'       // dark overlay
      : 'rgba(255,255,255,0.4)'; // light overlay

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: 400,
        backgroundImage: `
          linear-gradient(${overlay}, ${overlay}),
          url('/assets/background.jpg')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.mode === 'dark' ? '#fff' : '#000',
        textAlign: 'center',
      }}
    >
      {children}
    </Box>
  );
};
