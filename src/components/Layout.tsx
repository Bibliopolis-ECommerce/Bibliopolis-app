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
  const headerHeight =
    typeof theme.mixins.toolbar.minHeight === 'number'
      ? theme.mixins.toolbar.minHeight
      : parseInt(theme.mixins.toolbar.minHeight as string, 10) || 64;
  const footerHeight = 64;

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
          /* NO pt here! Toolbar gives the top offset */
          pb: `${footerHeight}px`,                                  // keep footer gap
          minHeight: `calc(100vh - ${headerHeight + footerHeight}px)`,
          overflowY: 'auto',                                         // scrollable content
        }}
      >
        <Container maxWidth="lg">{children}</Container>
      </Box>

      <Footer />
    </>
  );
};
