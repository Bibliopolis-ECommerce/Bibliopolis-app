// src/theme/darkTheme.ts
import { createTheme, PaletteColor, ThemeOptions } from "@mui/material/styles";

const darkPalette: ThemeOptions["palette"] = {
  mode: "dark",
  primary: { main: "#4F46E5" }, // soft indigo
  secondary: { main: "#F59E0B" }, // muted amber
  background: {
    default: "#121212", // charcoal
    paper: "#1F1F1F", // dark gray
  },
  text: {
    primary: "#E5E5E5", // near-white
    secondary: "#B0B0B0", // light gray
  },
  divider: "rgba(255,255,255,0.12)",
  action: {
    hover: "rgba(79, 70, 229, 0.1)",
  },
};

const typography: ThemeOptions["typography"] = {
  fontFamily: ['"Roboto"', '"Merriweather"', "sans-serif"].join(","),
  h1: { fontFamily: '"Merriweather"', fontSize: "3rem", fontWeight: 700 },
  h2: { fontFamily: '"Merriweather"', fontSize: "2rem", fontWeight: 600 },
  h3: { fontFamily: '"Merriweather"', fontSize: "1.5rem", fontWeight: 500 },
  body1: { fontSize: "1rem", lineHeight: 1.6 },
  body2: { fontSize: "0.875rem", lineHeight: 1.5 },
};

const shape = { borderRadius: 8 };

export const darkTheme = createTheme({
  palette: darkPalette,
  typography,
  shape,
  components: {
    MuiAppBar: {
      defaultProps: {
        position: "fixed",
        elevation: 0,
      },
      styleOverrides: {
        root: {
          height: 30,
          backgroundColor: (darkPalette.primary as PaletteColor).main,
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: darkPalette.background!.default,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: shape.borderRadius,
          textTransform: "none",
        },
      },
    },
  },
});
