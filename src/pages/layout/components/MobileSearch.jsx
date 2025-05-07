import React, { useState, useContext } from 'react';
import { TextField, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled, useTheme } from '@mui/system';
import { LanguageContext } from '../../../context/AppContext';
import NavBarData from '../../../lang/NavBar.json';
const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  borderRadius: 4,
  backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#f3f3f3',
  overflow: 'hidden',
  width: '100%',
  maxWidth: '600px',
  margin: '0 auto',
}));

const sharedStyles = (theme) => ({
  '& fieldset': {
    transition: 'border-color 0.3s',
  },
  '&:hover fieldset': {
    borderColor: 'transparent',
  },
  '&.Mui-focused fieldset': {
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
});

const SearchField = styled(TextField)(({ theme }) => ({
  flexGrow: 1,
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.mode === 'dark' ? '#444' : 'white',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    color: 'inherit',
    ...sharedStyles(theme),
  },
  '& .MuiInputBase-input': {
    color: 'inherit',
  },
}));

const MobileSearch = () => {
  const { language } = useContext(LanguageContext);
  const theme = useTheme();
  const [query, setQuery] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = () => {
    console.log(`Searching for ${query}`);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <StyledBox
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        border: `1px solid ${
          isHovered || isFocused
            ? theme.palette.secondary.main
            : 'rgba(0, 0, 0, 0.02)'
        }`,
      }}
    >
      <SearchField
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={NavBarData.search_bar[language]}
        size="small"
        variant="outlined"
        onFocus={handleFocus}
        onBlur={handleBlur}
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
    </StyledBox>
  );
};

export default MobileSearch;
