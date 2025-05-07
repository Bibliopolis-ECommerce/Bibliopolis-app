import { useContext, useState,useEffect } from 'react';
import { Box, Grid, Typography, Card, CardContent, CssBaseline } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PaymentIcon from '@mui/icons-material/Payment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ForumIcon from '@mui/icons-material/Forum';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../layout/Navbar';
import Footer from '../../layout/Footer';
import { lightTheme } from '../../../context/theme';
import { LanguageContext } from '../../../context/AppContext';
import cardsData from '../../../lang/CardsProfile.json';
import { AuthContext } from '../../../context/AuthContext'; 

const iconStyle = {
  color: lightTheme.palette.customColors.cardBackground,
  fontSize: '40px'
};

const icons = [
  <AccountCircleIcon sx={iconStyle} />,
  <PaymentIcon sx={iconStyle} />,
  <FavoriteIcon sx={iconStyle} />,
  <ForumIcon sx={iconStyle} />,
  <ListAltIcon sx={iconStyle} />
];

const paths = [
  '/modify-login-info',
  '/modify-banking-info',
  '/wishlist',
  '/messaging',
  '/orders'
];

const MemberProfilePage = () => {
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();
  const { userData } = useContext(AuthContext);  
  const [memberData, setMemberInfo] = useState(null);


  useEffect(() => {
    if (userData.member) {
      setMemberInfo(userData.member);
    }
  }, [userData.member]);

  const handleCardClick = (index) => {
    navigate(paths[index]);
  };

  return (
    <>     
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h4" gutterBottom>
            {cardsData.Main_title[language]} {memberData ? memberData.first_name : ''}
          </Typography>
          <Grid container spacing={3}>
            {cardsData.cards.map((card, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
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
                  onClick={() => handleCardClick(index)}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    {icons[index]}
                    <Typography variant="h6">{card.title[language]}</Typography>
                    <Typography variant="body2">{card.description[language]}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Footer sx={{ flexShrink: 0 }} />
      </Box>
    </>
  );
};

export default MemberProfilePage;
