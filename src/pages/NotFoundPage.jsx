import { useContext } from 'react';
import { Box, Typography, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LanguageContext} from '../context/AppContext';
import ErrorNotFoundPage from '../lang/ErrorNotFoundPage.json';
import Navbar from '../pages/layout/Navbar';
import Footer from '../pages/layout/Footer';
import CssBaseline from '@mui/material/CssBaseline';

import CustomIcon from '../assets/apple-touch-icon.png';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <>
    <CssBaseline />
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          textAlign: 'center',
        }}
      >
        <Box
          component="img"
          src={CustomIcon}
          alt="Custom Icon"
          sx={{
            width: 250,
            height: 250,
          }}
        />
        <Typography variant="h5" gutterBottom >
          {ErrorNotFoundPage.error_not_found[language]}
        </Typography>
        <Button variant="contained" color="success" onClick={handleGoHome}>
          {ErrorNotFoundPage.home_page[language]}
        </Button>
      </Box>
      <Footer />
    </>
  );
};

export default NotFoundPage;
