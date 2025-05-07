import { useState } from 'react';
import Cookies from 'js-cookie';

const useLanguage = () => {
  const [language, setLanguage] = useState(
    () => Cookies.get('language') || 'FR',
  );

  const toggleLanguage = (lang) => {
    if (language !== lang) {
      setLanguage(lang);
      Cookies.set('language', lang, { expires: 365 });
    }
  };

  return { language, toggleLanguage };
};

export default useLanguage;
