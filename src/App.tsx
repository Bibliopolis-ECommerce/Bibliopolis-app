import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';

import { MainPage } from './components/MainPage';
import { Layout } from './components/Layout';
import { lightTheme, darkTheme } from './theme/theme';
// import { CatalogPage } from './pages/CatalogPage';

function App() {
  // ✅ Only one darkMode state
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<'en' | 'fr'>('en');

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const toggleLanguage = () =>
    setLanguage((prev) => (prev === 'en' ? 'fr' : 'en'));

  // You could memoize the theme if you like:
  const theme = useMemo(
    () => (darkMode ? darkTheme : lightTheme),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          toggleLanguage={toggleLanguage}
        >
          <Routes>
            <Route path="/" element={<MainPage />} />
            {/* <Route path="/catalog" element={<CatalogPage />} /> */}
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
