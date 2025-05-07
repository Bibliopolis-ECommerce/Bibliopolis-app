import React, { forwardRef, useContext, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Link,
  Typography,
  useTheme,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { AuthContext } from '../../../context/AuthContext';
import useLanguage from '../../../context/hooks/useLanguage';
import AuthLang from '../../../lang/SignIn.json';
import ErrorLang from '../../../lang/Error.json';
import { CustomTextField } from '../../../context/theme';

const SignInModal = forwardRef((props, ref) => {
  const theme = useTheme();
  const { login, googleLogin, setUser } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [role, setRole] = useState('member'); 
  const navigate = useNavigate();
  const { language } = useLanguage();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    const errorLogin = ErrorLang.error_login[language];

    try {
      const userData = await login(email, password, role); 
        setUser(userData);
        props.onSuccess();
      } catch (error) {
      setError(errorLogin);
      console.error('Login failed', error);
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      const userData = await googleLogin(response.credential);
      if (props.onSuccess) {
        setUser(userData);
        props.onSuccess();
      }
      console.log('Google user information:', userData);
      navigate('/');
    } catch (error) {
      setError(error.message);
      console.error('Google login failed', error);
    }
  };

  const handleGoogleFailure = (response) => {
    console.error('Google login failed', response);
    setError('Google login failed');
  };
  
  return (
    <Container component="main" maxWidth="xs" ref={ref}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: theme.palette.background.paper,
          padding: 4,
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" id="modal-signin-title">
          {AuthLang.SignIn[language]}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <CustomTextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={AuthLang.EmailAddress[language]}
            name="email"
            autoComplete="email"
            autoFocus
            error={!!error}
          />
          <CustomTextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={AuthLang.Password[language]}
            type="password"
            id="password"
            autoComplete="current-password"
            error={!!error}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              value={role}
              label="Role"
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="member">Member</MenuItem>
              <MenuItem value="supplier">Supplier</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label={AuthLang.RememberMe[language]}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 3, mb: 2, color: 'white' }}
          >
            {AuthLang.SignIn[language]}
          </Button>
              <div style={{ marginTop: '5px', marginBottom: '15px' }}>
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleFailure}
                  />
            </div>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                {AuthLang.ForgotPwd[language]}
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/signup" variant="body2">
                {AuthLang.NoAccount[language]}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
});

export default SignInModal;
