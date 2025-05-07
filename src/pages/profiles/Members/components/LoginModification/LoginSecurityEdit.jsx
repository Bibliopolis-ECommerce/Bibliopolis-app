import React, { useContext, useState } from 'react';
import { Box, Typography, Button, TextField, Card, CardContent, Snackbar, Alert } from '@mui/material';
import { LanguageContext } from '../../../../../context/AppContext';
import profileEditData from '../../../../../lang/ProfilEdit.json';
import { lightTheme } from '../../../../../context/theme';
import apiService from '../../../../../services/ZooZoneAPIService';
import { AuthContext } from '../../../../../context/AuthContext';

const LoginSecurityEdit = ({ onCancel, onSave }) => {
  const { userData, setUser } = useContext(AuthContext);
  const [updatedUser, setUpdatedUser] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const { language } = useContext(LanguageContext);
  const profileEdit = profileEditData.profileEdit;

  const handleChange = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    const filteredData = Object.keys(updatedUser).reduce((acc, key) => {
      if (updatedUser[key]) {
        acc[key] = updatedUser[key];
      }
      return acc;
    }, {});
    
    try {
      const response = await apiService.updateUserProfile({ ...filteredData, email: userData.member.email }, "member");
      const updatedMemberData = { ...userData.member, ...filteredData };
      setUser({ member: updatedMemberData });
      setSnackbarMessage('Member information updated successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    
      setTimeout(() => {
        onSave(updatedMemberData);
      }, 3000); 
    } catch (error) {
      console.error('Error updating member:', error);
      setSnackbarMessage('Failed to update member information');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Card
      elevation={3}
      sx={{
        p: 3,
        margin: '20px auto',
        maxWidth: '600px',
      }}
    >
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {profileEdit.editTitle[language]}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label={profileEdit.first_name[language]}
            name="first_name"
            value={updatedUser.first_name || ''}
            onChange={handleChange}
          />
          <TextField
            label={profileEdit.last_name[language]}
            name="last_name"
            value={updatedUser.last_name || ''}
            onChange={handleChange}
          />
          <TextField
            label={profileEdit.email[language]}
            name="email"
            value={updatedUser.email || ''}
            onChange={handleChange}
          />
          <TextField
            label={profileEdit.phoneNumber[language]}
            name="phone"
            value={updatedUser.phone || ''}
            onChange={handleChange}
          />
          <TextField
            label={profileEdit.address[language]}
            name="address"
            value={updatedUser.address || ''}
            onChange={handleChange}
          />
          <TextField
            label={profileEdit.password[language]}
            name="password"
            type="password"
            value={updatedUser.password || ''}
            onChange={handleChange}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button 
              variant="contained"
              sx={{ 
                color: 'white',
                backgroundColor: lightTheme.palette.secondary.main,
                fontSize: '16px',
                transition: 'all 0.3s ease',
              }}
              color="secondary"
              onClick={handleSave}
            >
              {profileEdit.saveButton[language]}
            </Button>
            <Button
              variant="outlined"
              sx={{ borderColor: '#f28b82', color: '#f28b82' }}
              onClick={onCancel}
            >
              {profileEdit.cancelButton[language]}
            </Button>
          </Box>
        </Box>
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} variant="filled" sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </CardContent>
    </Card>
  );
};

export default LoginSecurityEdit;
