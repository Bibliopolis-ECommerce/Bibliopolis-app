import { AppBar, useTheme, Toolbar, Box, useMediaQuery } from '@mui/material';
import SearchBar from './components/Search';
import IconsGroup from './components/IconsGroup';
import Logo from './components/Logo';
import MobileSearch from './components/MobileSearch';
import SignInButton from './components/SignInButton';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* // Composant Logo */}
        <Logo />
        {/* Barre de recherche  */}
        {isMobile ? (
          <Box sx={{ flexGrow: 1 }}>
            <MobileSearch />
          </Box>
        ) : (
          <Box sx={{ flexGrow: 1 }}>
            <SearchBar />
          </Box>
        )}
        {/* Groupe d'icons et Sign-in */}
        <Box sx={{ display: 'flex' }}>
          <IconsGroup />
          <SignInButton /> {/* Gere aussi le mobile menu */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
