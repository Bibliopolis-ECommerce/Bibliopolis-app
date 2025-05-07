import { useContext, useState, useEffect } from 'react';
import { Box, Grid, Typography, Card, CardContent, CssBaseline } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ForumIcon from '@mui/icons-material/Forum';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../layout/Navbar';
import Footer from '../../layout/Footer';
import { lightTheme } from '../../../context/theme';
import { AuthContext } from '../../../context/AuthContext'; 
import SupplierLang from '../../../lang/SupplierAccount.json'
import { LanguageContext } from '../../../context/AppContext';


const iconStyle = {
  color: lightTheme.palette.customColors.cardBackground,
  fontSize: '40px'
};

const icons = [
  <AccountCircleIcon sx={iconStyle} />,
  <ProductionQuantityLimitsIcon sx={iconStyle} />,
  <ForumIcon sx={iconStyle} />,
];

const paths = [
  '/modify-supplier-login-info',
  '/manage-products',
  '/supplier-messages',
];

const SupplierProfilePage = () => {
  const navigate = useNavigate();
  const { userData } = useContext(AuthContext);
  const [supplierData, setSupplierInfo] = useState(null);
  const { language } = useContext(LanguageContext);



  useEffect(() => {
    if (userData.supplier) {
      setSupplierInfo(userData.supplier);
    }
  }, [userData]);

  const handleCardClick = (index) => {
    navigate(paths[index]);
  };

  return (
    <>     
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Box sx={{ flexGrow: 1, p: 3}}>
          <Typography variant="h4" gutterBottom>
           {SupplierLang.welcome_message[language]} {supplierData ? supplierData.contact_name : ''}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Card 
                sx={{
                  minHeight: '150px',
                  minWidth: '250px',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                  }
                }}
                onClick={() => handleCardClick(0)}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  {icons[0]}
                  <Typography variant="h6">{SupplierLang.login_security_address.title[language]}</Typography>
                  <Typography variant="body2">{SupplierLang.login_security_address.description[language]}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card 
                sx={{
                  minHeight: '150px',
                  minWidth: '250px',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                  }
                }}
                onClick={() => handleCardClick(1)}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  {icons[1]}
                  <Typography variant="h6">{SupplierLang.product_management.title[language]}</Typography>
                  <Typography variant="body2">{SupplierLang.product_management.description[language]}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card 
                sx={{
                  minHeight: '150px',
                  minWidth: '250px',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                  }
                }}
                onClick={() => handleCardClick(2)}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  {icons[2]}
                  <Typography variant="h6">{SupplierLang.messages.title[language]}</Typography>
                  <Typography variant="body2">{SupplierLang.messages.description[language]}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
        <Footer sx={{ flexShrink: 0 }} />
      </Box>
    </>
  );
};

export default SupplierProfilePage;
