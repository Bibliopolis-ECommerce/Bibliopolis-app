import React, { useState, useContext } from 'react';
import {
  Button,
  useMediaQuery,
  useTheme,
  Box,
  Modal,
  CircularProgress,
} from '@mui/material';
import MobileMenu from './MobileMenu';
import SignIn from '../../auth_page/components/SignInModal';
import {
  ThemeToggleContext,
  LanguageContext,
} from '../../../context/AppContext';
import { AuthContext } from '../../../context/AuthContext';
import NavBarData from '../../../lang/NavBar.json';
import UserAvatar from './UserAvatar';

const SignInButton = () => {
  const { language } = useContext(LanguageContext);
  const { isDarkMode, toggleDarkMode } = useContext(ThemeToggleContext);
  const { userData, loading } = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSuccess = () => {
    setOpen(false);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      {isMobile ? (
        <Box sx={{ display: 'flex' }}>
          <MobileMenu toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
          {userData ? (
            <UserAvatar />
          ) : (
            <Button
              variant="contained"
              color="secondary"
              sx={{
                color: 'white',
                ml: 2,
                width: '100px',
                height: '40px',
              }}
              onClick={handleOpen}
            >
              {NavBarData.sign_in_button[language]}
            </Button>
          )}
        </Box>
      ) : (
        <Box>
          {userData ? (
            <UserAvatar />
          ) : (
            <Button
              variant="contained"
              color="secondary"
              sx={{
                color: 'white',
                ml: 2,
                width: '110px',
                height: '40px',
                display: 'inherit',
              }}
              onClick={handleOpen}
            >
              {NavBarData.sign_in_button[language]}
            </Button>
          )}
        </Box>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-signin-title"
        aria-describedby="modal-signin-description"
      >
        <SignIn onSuccess={handleSuccess} />
      </Modal>
    </>
  );
};

export default SignInButton;
