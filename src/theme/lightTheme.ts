import { createTheme, ThemeOptions } from '@mui/material/styles';

const lightPalette: ThemeOptions['palette'] = {
  mode: 'light',
  primary:   { main: '#1E40AF' },
  secondary: { main: '#FBBF24' },
  background: {
    default: '#F5F5F5',
    paper:   '#FFFFFF',
  },
  text: {
    primary:   '#212121',
    secondary: '#616161',
  },
  divider: '#E0E0E0',
  action: {
    hover: 'rgba(30, 64, 175, 0.1)',
  },
};

const typography: ThemeOptions['typography'] = {
  fontFamily: ['"Roboto"', '"Merriweather"', 'sans-serif'].join(','),
  h1: { fontFamily: '"Merriweather"', fontSize: '3rem', fontWeight: 700 },
  h2: { fontFamily: '"Merriweather"', fontSize: '2rem', fontWeight: 600 },
  h3: { fontFamily: '"Merriweather"', fontSize: '1.5rem', fontWeight: 500 },
  body1: { fontSize: '1rem', lineHeight: 1.6 },
  body2: { fontSize: '0.875rem', lineHeight: 1.5 },
};

const shape = { borderRadius: 8 };

export const lightTheme = createTheme({
  palette: lightPalette,
  typography,
  shape,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: lightPalette.background!.default,  // ✅ non-null assert
          WebkitFontSmoothing: 'antialiased',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: shape.borderRadius,
          textTransform: 'none',
        },
      },
    },
  },
});
