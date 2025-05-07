import React, { useState, useContext, useEffect } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import Navbar from '../../../../layout/Navbar';
import Footer from '../../../../layout/Footer';
import LoginSecurityEdit from './LoginSecurityEdit';
import { LanguageContext } from '../../../../../context/AppContext';
import profileEditData from '../../../../../lang/ProfilEdit.json';
import { lightTheme } from '../../../../../context/theme';
import { AuthContext } from '../../../../../context/AuthContext'; 
import { useNavigate } from 'react-router-dom'; 

const LoginSecurityDetails = () => {
  const { language } = useContext(LanguageContext);
  const { userData } = useContext(AuthContext);
  const [isEditMode, setIsEditMode] = useState(false);
  const [MemberInfo, setMemberInfo] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (userData.member) {
      setMemberInfo(userData.member);
    }
  }, [userData.member]);

  const handleModifyClick = () => {
    setIsEditMode(true);
  };

  const handleCancelClick = () => {
    setIsEditMode(false);
  };

  const handleSaveClick = (updatedUser) => {
    setMemberInfo(updatedUser);
    setIsEditMode(false);
  };

  const handleDeleteAccountClick = () => {
    console.log('Delete account clicked');
  };

  const profileEdit = profileEditData.profileEdit;

  if (!MemberInfo) {
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
                  <Typography variant="body1">{MemberInfo.first_name || 'N/A'}</Typography>
                </Box>
                <Box>
                  <Typography variant="h6">{profileEdit.last_name[language]}</Typography>
                  <Typography variant="body1">{MemberInfo.last_name || 'N/A'}</Typography>
                </Box>
                <Box>
                  <Typography variant="h6">{profileEdit.email[language]}</Typography>
                  <Typography variant="body1">{MemberInfo.email || 'N/A'}</Typography>
                </Box>
                <Box>
                  <Typography variant="h6">{profileEdit.phoneNumber[language]}</Typography>
                  <Typography variant="body1">{MemberInfo.phone || 'N/A'}</Typography>
                </Box>
                <Box>
                  <Typography variant="h6">{profileEdit.address[language]}</Typography>
                  <Typography variant="body1">{MemberInfo.address || 'N/A'}</Typography>
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
                    Delete Account
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
