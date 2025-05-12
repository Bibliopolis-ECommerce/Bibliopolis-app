// src/components/Footer.tsx
import Box from '@mui/material/Box';
//import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

// src/components/Footer.tsx
export const Footer: React.FC = () => {
  const theme = useTheme();
  const height = theme.mixins.toolbar.minHeight; // reuse 56px
  console.log('Footer height:', height); // Check the height value
  return (
    
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        height: height,                   // ← exactly same as AppBar
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      © {new Date().getFullYear()} Bibliopolis — All rights reserved.
    </Box>
  );
};
