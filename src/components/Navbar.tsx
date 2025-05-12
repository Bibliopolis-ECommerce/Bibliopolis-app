import React from 'react';
import {
  AppBar, Toolbar, Typography, Switch, IconButton, Box
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import TranslateIcon from '@mui/icons-material/Translate';

type Props = {
  darkMode: boolean;
  toggleDarkMode: () => void;
  toggleLanguage: () => void;
};

export const Navbar: React.FC<Props> = ({ darkMode, toggleDarkMode, toggleLanguage }) => {
  return (
    <AppBar position="fixed" elevation={4}>

      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Bibliopolis
        </Typography>

        <IconButton onClick={toggleLanguage} color="inherit">
          <TranslateIcon />
        </IconButton>

        <Box display="flex" alignItems="center">
          <Brightness4Icon />
          <Switch checked={darkMode} onChange={toggleDarkMode} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
