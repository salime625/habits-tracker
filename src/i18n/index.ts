import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { arTranslations } from './ar';
import { frTranslations } from './fr';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ar: {
        translation: arTranslations
      },
      fr: {
        translation: frTranslations
      }
    },
    fallbackLng: 'fr',
    debug: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;