import { useContext } from 'react';
import { Badge, Box, IconButton, Link } from '@mui/material';
import { ShoppingCart, Brightness7, Brightness2 } from '@mui/icons-material';
import { styled } from '@mui/system';
import { ThemeToggleContext } from '../../../context/AppContext';
import useCart from '../../../context/hooks/useCart';
import { Link as RouterLink } from 'react-router-dom';
import LanguageButton from './LanguageButton';

const IconsContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  paddingRight: '20px',
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  transition: 'color 0.3s ease, background-color 0.3s ease',
  width: '40px',
  height: '40px',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.iconButton.color,
  '&:hover': {
    backgroundColor: theme.palette.iconButton.hoverBackgroundColor,
    color: theme.palette.secondary.main,
  },
}));

const Separator = styled(Box)(() => ({
  width: '1px',
  height: '24px',
  backgroundColor: 'rgba(0, 0, 0, 0.12)',
  margin: '0 10px',
}));

const IconsGroup = () => {
  const { getCartItemCount } = useCart();
  const { isDarkMode, toggleDarkMode } = useContext(ThemeToggleContext);
  //const theme = useTheme();

  return (
    <IconsContainer sx={{ display: { xs: 'none', md: 'flex' } }}>
      <LanguageButton />
      <Separator />
      {/* DARK MODE ICON */}
      <Box display="flex" alignItems="center">
        <StyledIconButton onClick={toggleDarkMode}>
          {isDarkMode ? <Brightness7 /> : <Brightness2 />}
        </StyledIconButton>
      </Box>
      {/* CART ICON */}
      <Separator />
      <Badge badgeContent={getCartItemCount()} color="error">
        <Link component={RouterLink} to="/cart" variant="body2">
          <StyledIconButton>
            <ShoppingCart />
          </StyledIconButton>
        </Link>
      </Badge>
    </IconsContainer>
  );
};

export default IconsGroup;
