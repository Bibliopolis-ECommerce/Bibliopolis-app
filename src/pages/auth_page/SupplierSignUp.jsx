import React, { useContext, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import BusinessIcon from '@mui/icons-material/Business';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { LanguageContext } from '../../context/AppContext';
import apiService from '../../services/ZooZoneAPIService';
import Copyright from './components/Copyright';
import { AuthContext } from '../../context/AuthContext';
import Translations from '../../lang/SuppliersSignUp.json';
import ErrorLang from '../../lang/Error.json';
import { CustomTextField } from '../../context/theme';


export default function SupplierSignUp() {
  const { language } = useContext(LanguageContext);
  const {setUser} = useContext(AuthContext); 
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
      company_name: data.get('company-name'),
      contact_name: data.get('contact-name'),
      phone: data.get('phone-number'),
      address: data.get('address'),
      promo: data.get('extraEmail') ? 'on' : 'off',
    };

    if (password !== confirmedPassword){
      setPasswordError(ErrorLang.error_created_password[language]);
      return;
    } else {
      setPasswordError('');
    }

    try {
      const signupResponse = await apiService.createSupplier(formData);
      console.log('Signup response:', signupResponse);

      const loginResponse = await apiService.login(formData.email, formData.password, 'supplier');
      console.log('Login response:', loginResponse);

      setUser(loginResponse);

      navigate('/account-supplier');
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
          <BusinessIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {Translations.supplier_signup.title[language]}
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomTextField
                autoComplete="company-name"
                name="company-name"
                required
                fullWidth
                id="companyName"
                label={Translations.supplier_signup.company_name[language]}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                required
                fullWidth
                id="contactName"
                label={Translations.supplier_signup.contact_name[language]}
                name="contact-name"
                autoComplete="contact-name"
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                required
                fullWidth
                id="email"
                label={Translations.supplier_signup.email[language]}
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
                placeholder="xxx-xxx-xxxx"
                label={Translations.supplier_signup.phone_number[language]}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                required
                fullWidth
                id="address"
                label={Translations.supplier_signup.address[language]}
                name="address"
                autoComplete="address"
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                required
                fullWidth
                name="password"
                label={Translations.supplier_signup.password[language]}
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
                label={Translations.supplier_signup.confirm_password[language]}
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
                label={Translations.supplier_signup.marketing_opt_in[language]}
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
            {Translations.supplier_signup.sign_up_button[language]}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/signin" variant="body2">
                {Translations.supplier_signup.already_have_account[language]}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
