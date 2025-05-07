import { AppBar, Box, Toolbar, Typography, useTheme } from '@mui/material';
import Logo from './components/Logo';

const Footer = () => {
  const theme = useTheme();

  return (
    <AppBar
      component="footer"
      sx={{
        position: 'sticky',
        top: 'auto',
        bottom: 0,
        marginTop: 'auto',
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Logo />
        </Box>
        <Typography variant="body2" color="textSecondary">
          © 2024 ZooZone. All rights reserved.
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
