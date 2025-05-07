import React, { useState, useContext, useEffect } from 'react';
import {
  TextField,
  MenuItem,
  IconButton,
  Box,
  useMediaQuery,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled, useTheme } from '@mui/system';
import NavBarData from '../../../lang/NavBar.json';
import apiService from '../../../services/ZooZoneAPIService';
import { LanguageContext } from '../../../context/AppContext';

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

const CategoryField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor:
      theme.palette.mode === 'dark' ? '#444' : 'rgba(0, 0, 0, 0.02)',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    '& fieldset': {
      borderRight: 0,
    },
    color: 'inherit',
    ...sharedStyles(theme),
  },
  '& .MuiInputBase-input': {
    color: 'inherit',
  },
}));

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

const SearchBar = () => {
  const [categoriesData, setCategoriesData] = useState([]); 

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { language } = useContext(LanguageContext);
  const [category, setCategory] = useState('0');
  const [query, setQuery] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await apiService.getCategories();
        setCategoriesData(data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchCategories(); 
  }, [language]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSearch = () => {
    window.location.assign(`/search/${query}`);
    console.log(`Searching for ${query} in ${category}`);
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
      {!isMobile && (
        <CategoryField
          select
          value={category}
          onChange={handleCategoryChange}
          size="small"
          variant="outlined"
          onFocus={handleFocus}
          onBlur={handleBlur}
          SelectProps={{
            MenuProps: {
              PaperProps: {
                style: {
                  backgroundColor:
                    theme.palette.mode === 'dark' ? '#333' : '#fff',
                },
              },
            },
          }}
        >
          <MenuItem value="0">{NavBarData.default_category[language]}</MenuItem>
          {categoriesData.map((item, i) => (
            <MenuItem key={i} value={item.id}>
              {item.name[language]}
            </MenuItem>
          ))}
        </CategoryField>
      )}
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

export default SearchBar;
