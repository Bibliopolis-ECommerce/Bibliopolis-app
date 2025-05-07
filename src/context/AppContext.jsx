import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@emotion/react';
import Cookies from 'js-cookie';
import { lightTheme, darkTheme } from './theme';
import { AuthProvider, AuthContext } from './AuthContext';
import LoadingScreen from './LoadingScreen';
import { CartProvider } from './CartContext';
import useLanguage from './hooks/useLanguage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { SupplierProvider } from '../context/SupplierContext';

export const ThemeToggleContext = React.createContext();
export const LanguageContext = React.createContext();

const AppProviders = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(
    () => Cookies.get('isDarkMode') === 'true',
  );
  const [loading, setLoading] = useState(true);
  const { language, toggleLanguage } = useLanguage();

  useEffect(() => {
    const storedDarkMode = Cookies.get('isDarkMode');
    if (storedDarkMode) {
      setIsDarkMode(storedDarkMode === 'true');
    }
    setLoading(false);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newDarkMode = !prev;
      Cookies.set('isDarkMode', newDarkMode, { expires: 365 });
      return newDarkMode;
    });
  };

  if (loading) {
    return <LoadingScreen />;
  }

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={clientId}>
     <SupplierProvider> 
      <AuthProvider>
        <CartProvider>
          <ThemeToggleContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            <LanguageContext.Provider value={{ language, toggleLanguage }}>
              <AuthContext.Consumer>
                {({ loading: authLoading }) => {
                  if (authLoading) {
                    return <LoadingScreen />;
                  }
                  return (
                    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                      {children}
                    </ThemeProvider>
                  );
                }}
              </AuthContext.Consumer>
            </LanguageContext.Provider>
          </ThemeToggleContext.Provider>
        </CartProvider>
      </AuthProvider>
      </SupplierProvider>
    </GoogleOAuthProvider>
  );
};

export default AppProviders;
