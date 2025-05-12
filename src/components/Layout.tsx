import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Container, Box } from '@mui/material';

type Props = {
  children: React.ReactNode;
  darkMode: boolean;
  toggleDarkMode: () => void;
  toggleLanguage: () => void;
};

export const Layout: React.FC<Props> = ({ children, darkMode, toggleDarkMode, toggleLanguage }) => {
  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} toggleLanguage={toggleLanguage} />
      <Container sx={{ my: 4 }}>
        {children}
      </Container>
      <Footer />
    </>
  );
};
