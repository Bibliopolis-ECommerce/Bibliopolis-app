// src/theme/lightTheme.ts
import { createTheme, PaletteColor, ThemeOptions } from '@mui/material/styles';

const lightPalette: ThemeOptions['palette'] = {
  mode: 'light',
  primary:   { main: '#1E40AF' }, // deep indigo
  secondary: { main: '#FBBF24' }, // warm gold
  background: {
    default: '#F5F5FA',           // page background
    paper:   '#FFFFFF',           // surfaces (cards, sheets, etc.)
  },
  text: {
    primary:   '#212121',         // almost black
    secondary: '#616161',         // cool gray
  },
  divider: '#E0E0E0',
  action: {
    hover: 'rgba(30, 64, 175, 0.1)',
  },
};

const typography: ThemeOptions['typography'] = {
  fontFamily: ['Roboto', 'Merriweather', 'sans-serif'].join(','),
  h1: { fontFamily: 'Merriweather', fontSize: '3rem',   fontWeight: 700 },
  h2: { fontFamily: 'Merriweather', fontSize: '2rem',   fontWeight: 600 },
  h3: { fontFamily: 'Merriweather', fontSize: '1.5rem', fontWeight: 500 },
  body1: { fontSize: '1rem', lineHeight: 1.6 },
  body2: { fontSize: '0.875rem', lineHeight: 1.5 },
};

const shape = { borderRadius: 8 };

export const lightTheme = createTheme({
  palette:    lightPalette,
  typography,
  shape,
  components: {
    // Navbar (AppBar) styling
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        position: 'fixed',
      },
      styleOverrides: {
        root: {
          height:        64,
backgroundColor: (lightPalette.primary as PaletteColor).main,          boxShadow:    '0 2px 4px rgba(0,0,0,0.1)',
        },
      },
    },

    // Global body background
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: lightPalette.background!.default,
          WebkitFontSmoothing: 'antialiased',
        },
      },
    },

    // Buttons default style
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: shape.borderRadius,
          textTransform: 'none',
        },
      },
    },

    // If you choose to wrap your Footer in a Paper:
    MuiPaper: {
      styleOverrides: {
        root: {
          '&.footer': {
            height: 64,
backgroundColor: (lightPalette.primary as PaletteColor).main,            color: lightPalette.background!.default,
            boxShadow: '0 -2px 4px rgba(0,0,0,0.1)',
          },
        },
      },
    },
  },
});
