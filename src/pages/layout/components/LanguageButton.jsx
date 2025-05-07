import { useState, useContext } from 'react';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import { styled, useTheme } from '@mui/system';
import { LanguageContext } from '../../../context/AppContext';
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  transition: 'color 0.3s ease, background-color 0.3s ease',
  width: '110px',
  height: '45px',
  color: theme.palette.iconButton.color,
  padding: '0 8px',
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    backgroundColor: theme.palette.iconButton.hoverBackgroundColor,
    color: theme.palette.secondary.main,
  },
}));

const LanguageButton = () => {
    const { language } = useContext(LanguageContext);
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const { toggleLanguage } = useContext(LanguageContext);

  const translateTo = (lang) => () => {
    toggleLanguage(lang);
    handleTranslateMenuClose();
  };

  const handleTranslateMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleTranslateMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <StyledIconButton onClick={handleTranslateMenuOpen} sx={{ ml: 3 }}>
        <Box display="flex" alignItems="center">
          <Box className="cif-ca" sx={{ mr: 0,textIndent: '-9999px' }}>
            .
          </Box>
          <Box component="span" sx={{ ml: 1, fontSize: '1.2rem' }}>
          {language}
          </Box>
          
          <Box component="span" sx={{ ml: 1, fontSize: '0.8rem' }}>
            ▼
          </Box>
        </Box>
      </StyledIconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleTranslateMenuClose}
        transitionDuration={300}
        MenuListProps={{
          sx: {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
          },
        }}
      >
        <MenuItem onClick={translateTo('EN')}>English</MenuItem>
        <MenuItem onClick={translateTo('FR')}>Français</MenuItem>
      </Menu>
    </>
  );
};

export default LanguageButton;
