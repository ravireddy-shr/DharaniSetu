import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import hi from './hi.json';
import te from './te.json';
import ta from './ta.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
    te: { translation: te },
    ta: { translation: ta },
  },
  lng: (typeof window !== 'undefined' && localStorage.getItem('dharani_language')) || 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
