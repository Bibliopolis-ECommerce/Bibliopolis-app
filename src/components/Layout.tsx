// src/components/Layout.tsx
import React from 'react';
import { useTheme } from '@mui/material/styles';
import {Navbar} from './Navbar';
import {Footer} from './Footer';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

type Props = {
  children: React.ReactNode;
  darkMode: boolean;
  toggleDarkMode: () => void;
  toggleLanguage: () => void;
};

export const Layout: React.FC<Props> = ({
  children,
  darkMode,
  toggleDarkMode,
  toggleLanguage,
}) => {
  const theme = useTheme();
  const barHeight: any  = theme.mixins.toolbar.minHeight 

  return (
    <>
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        toggleLanguage={toggleLanguage}
      />

      {/* pushes main below AppBar */}
      <Toolbar />

         <Box
        component="main"
        sx={{
          // no need for pt: barHeight—Toolbar already did it
          pb: `${barHeight}px`, // push up above footer
          minHeight: `calc(100vh - ${barHeight * 2}px)`, // header + footer
          overflowY: 'auto',
        }}
      >
        <Container maxWidth="lg">{children}</Container>
      </Box>

      <Footer />
    </>
  );
};
