import React, { useContext, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { CustomTextField } from '../../context/theme';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { LanguageContext } from '../../context/AppContext';
import { AuthContext } from '../../context/AuthContext'; 
import AuthLang from '../../lang/SignUp.json';
import Copyright from './components/Copyright';
import apiService from '../../services/ZooZoneAPIService';
import ErrorLang from '../../lang/Error.json';

export default function SignUp() {
  const { language } = useContext(LanguageContext);
  const { setUser } = useContext(AuthContext); 
  const theme = useTheme();
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      email: data.get('email'),
      password: data.get('password'),
      firstName: data.get('first-name'),
      lastName: data.get('last-name'),
      phone: data.get('phone-number'),
      promo: data.get('extraEmail') ? 'on' : 'off',
    };

    if (password !== confirmedPassword){
      setPasswordError(ErrorLang.error_created_password[language]);
      return;
    } else {
      setPasswordError('');
    }


    try {
      const signupResponse = await apiService.signup(formData);
      console.log('Signup response:', signupResponse);

      const loginResponse = await apiService.login(formData.email, formData.password, 'member');
      console.log('Login response:', loginResponse);

      setUser(loginResponse);

      navigate('/account');

    } catch (error) {
      console.error('Error during signup or login:', error);
    }
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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {AuthLang.signUp_title[language]}
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                autoComplete="given-name"
                name="first-name"
                required
                fullWidth
                id="firstName"
                label={AuthLang.firstName_label[language]}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                required
                fullWidth
                id="lastName"
                label={AuthLang.lastName_label[language]}
                name="last-name"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                required
                fullWidth
                id="email"
                label={AuthLang.email_label[language]}
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                autoComplete="phone-number"
                name="phone-number"
                required
                fullWidth
                id="phone"
                placeholder='xxx-xxx-xxxx'
                label={AuthLang.phone_label[language]}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                required
                fullWidth
                name="password"
                label={AuthLang.password_label[language]}
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                required
                fullWidth
                name="confirmedPassword"
                label={AuthLang.confirmed_pass_label[language]}
                type="password"
                id="confirmed-password"
                onChange={(e) => setConfirmedPassword(e.target.value)}
                error={!!passwordError}
                helperText={passwordError}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox name="extraEmail" color="primary" />}
                label={AuthLang.marketing_checkbox_label[language]}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 3, mb: 2, color: 'white' }}
          >
            {AuthLang.signUp_button[language]}
          </Button>
          <Grid container direction="column" alignItems="center" spacing={1}>
            <Grid item>
              <Link component={RouterLink} to="/signin" variant="body2">
                {AuthLang.signIn_link[language]}
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/supplier-signup" variant="body2">
                {AuthLang.supplier[language]}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
