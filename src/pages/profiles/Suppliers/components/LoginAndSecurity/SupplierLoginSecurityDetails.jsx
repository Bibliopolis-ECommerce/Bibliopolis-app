import React, { useState, useContext, useEffect } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import Navbar from '../../../../layout/Navbar';
import Footer from '../../../../layout/Footer';
import LoginSecurityEdit from './SupplierLoginSecurityEdit';
import { LanguageContext } from '../../../../../context/AppContext';
import profileEditData from '../../../../../lang/ProfilEdit.json';
import { lightTheme } from '../../../../../context/theme';
import { AuthContext } from '../../../../../context/AuthContext'; 
import { useNavigate } from 'react-router-dom'; 

const LoginSecurityDetails = () => {
  const { language } = useContext(LanguageContext);
  const { userData } = useContext(AuthContext);
  const [supplierInfo, setSupplierInfo] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (userData.supplier) {
      setSupplierInfo(userData.supplier);
    }
  }, [userData.supplier]);

  const handleModifyClick = () => {
    setIsEditMode(true);
  };

  const handleCancelClick = () => {
    setIsEditMode(false);
  };

  const handleSaveClick = (updatedUser) => {
    setSupplierInfo(updatedUser);
    setIsEditMode(false);
  };

  const handleDeleteAccountClick = () => {
    console.log('Delete account clicked');
  };

  const profileEdit = profileEditData.profileEdit;

  if (!userData?.supplier) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Box sx={{ flexGrow: 1, p: 3 }}>
          {isEditMode ? (
            <LoginSecurityEdit onCancel={handleCancelClick} onSave={handleSaveClick} />
          ) : (
            <Paper
              elevation={3}
              sx={{
                p: 3,
                margin: '20px auto',
                maxWidth: '600px',
              }}
            >
              <Typography variant="h4" gutterBottom>
                {profileEdit.title[language]}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="h6">{profileEdit.first_name[language]}</Typography>
                  <Typography variant="body1">{userData?.supplier.contact_name || 'N/A'}</Typography>
                </Box>
                <Box>
                  <Typography variant="h6">Company name</Typography>
                  <Typography variant="body1">{userData?.supplier.company_name || 'N/A'}</Typography>
                </Box>
                <Box>
                  <Typography variant="h6">{profileEdit.email[language]}</Typography>
                  <Typography variant="body1">{userData?.supplier.email || 'N/A'}</Typography>
                </Box>
                <Box>
                  <Typography variant="h6">{profileEdit.phoneNumber[language]}</Typography>
                  <Typography variant="body1">{userData?.supplier.phone || 'N/A'}</Typography>
                </Box>
                <Box>
                  <Typography variant="h6">{profileEdit.address[language]}</Typography>
                  <Typography variant="body1">{userData?.supplier.address || 'N/A'}</Typography>
                </Box>
                <Box>
                  <Typography variant="h6">{profileEdit.password[language]}</Typography>
                  <Typography variant="body1">********</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button 
                    variant="contained"
                    sx={{ 
                      color: 'white',
                      backgroundColor: lightTheme.palette.secondary.main,
                      fontSize: '16px',
                      transition: 'all 0.3s ease',
                      flex: 1
                    }}
                    color="secondary"
                    onClick={handleModifyClick}
                  >
                    {profileEdit.modifyButton[language]}
                  </Button>
                  <Button 
                    variant="outlined"
                    sx={{ 
                      color: '#f28b82',
                      borderColor: '#f28b82',
                      fontSize: '16px',
                      transition: 'all 0.3s ease',
                      flex: 1
                    }}
                    onClick={handleDeleteAccountClick}
                  >
                    {profileEdit.deleteButton[language]}
                    </Button>
                </Box>
              </Box>
            </Paper>
          )}
        </Box>
        <Footer sx={{ mt: 'auto' }} />
      </Box>
    </>
  );
};

export default LoginSecurityDetails;
