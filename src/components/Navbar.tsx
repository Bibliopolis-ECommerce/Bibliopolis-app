// src/components/Navbar.tsx
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import { useTheme } from '@mui/material/styles';
import TranslateIcon from '@mui/icons-material/Translate';
import Brightness4Icon from '@mui/icons-material/Brightness4';

type Props = {
  darkMode: boolean;
  toggleDarkMode: () => void;
  toggleLanguage: () => void;
};

export const Navbar: React.FC<Props> = ({ darkMode, toggleDarkMode, toggleLanguage }) => {
  const theme = useTheme();

  return (
    <AppBar>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" color="inherit">
          Bibliopolis
        </Typography>

        <div>
          <IconButton color="inherit" onClick={toggleLanguage}>
            <TranslateIcon />
          </IconButton>
          <IconButton color="inherit" onClick={toggleDarkMode}>
            <Brightness4Icon />
          </IconButton>
          <Switch checked={darkMode} onChange={toggleDarkMode} />
        </div>
      </Toolbar>
    </AppBar>
  );
};
