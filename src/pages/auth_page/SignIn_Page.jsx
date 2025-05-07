import React, { useContext } from 'react';
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  Link,
  useTheme,
} from '@mui/material';
import SignInModal from './components/SignInModal';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../../context/AppContext';
import Copyright from './components/Copyright';

export default function SignIn() {
  const { language } = useContext(LanguageContext);
  const theme = useTheme();
  const navigate = useNavigate();

  const handleSuccess = () => {
    console.log('Member logged in');
    navigate('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <SignInModal onSuccess={handleSuccess} />
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </Container>
  );

}