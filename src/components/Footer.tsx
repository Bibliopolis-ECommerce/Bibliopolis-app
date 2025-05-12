// src/components/Footer.tsx
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

export const Footer: React.FC = () => {
  const theme = useTheme();
  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        height: 64,
        bgcolor: theme.palette.primary.main,
        color:  theme.palette.background.default,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 -2px 4px rgba(0,0,0,0.1)',
        zIndex: theme.zIndex.appBar,
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Bibliopolis — All rights reserved.
      </Typography>
    </Box>
  );
};
