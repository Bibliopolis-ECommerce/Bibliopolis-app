import { createTheme, styled } from '@mui/material';
import TextField from '@mui/material/TextField';

export const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: '#15c630'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#15c630',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'grey', 
    '&.Mui-focused': {
      color: '#15c630',
    },
    '&:hover': {
      color: '#15c630',
    },
  },
}));

export const lightTheme = createTheme({
  palette: {
    mode: 'light',

    secondary: {
      main: '#15c630',
    },
    customColors: {
      cardBackground: '#15c630',
    },
    CartSummary:{
      backgroundColor: 'grey.100',
      color: 'primary',
    },
    background: {
      default: 'white',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#333333',
    },
    iconButton: {
      hoverBackgroundColor: 'rgba(0, 0, 0, 0.1)',
      BackgroundColor: 'white',
      color: '#616161', 
      primary: '#000000',
    },
    button: {
      default: '#f5f3f0',
      selected: '#15c630', 
      hover: '#15c630', 
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',

    secondary: {
      main: '#15c630',
    },
    CartSummary:{
      backgroundColor: 'grey.800',
      color: 'white',
    },
    background: {
      paper: 'grey.900',
      default: '#424242',
    },
    text: {
      primary: '#ffffff',
      secondary: '#bbbbbb',
    },
    iconButton: {
      hoverBackgroundColor: 'rgba(0, 0, 0, 0.1)',
      BackgroundColor: 'rgba(0, 0, 0, 0.1)',
      color: '#E0E0E0', 
      primary: '#000000',
    },
    button: {
      default: '#4c4c4c', // grey 700
      selected: '#15c630', 
      hover: '#15c630', 
    },
  },
});
