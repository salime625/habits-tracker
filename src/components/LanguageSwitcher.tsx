import React from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const { dispatch } = useApp();
  
  const changeLanguage = (lng: 'ar' | 'fr') => {
    i18n.changeLanguage(lng);
    dispatch({ type: 'CHANGE_LANGUAGE', payload: lng });
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex items-center justify-center w-full rounded-md px-3 py-2 bg-opacity-20 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          id="language-menu"
          aria-haspopup="true"
        >
          <Globe className="h-5 w-5 mr-1" />
          {i18n.language === 'ar' ? 'العربية' : 'Français'}
        </button>
      </div>
      <div
        className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50"
      >
        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="language-menu">
          <button
            onClick={() => changeLanguage('fr')}
            className={`${
              i18n.language === 'fr' ? 'bg-gray-100 dark:bg-gray-700' : ''
            } block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700`}
            role="menuitem"
          >
            Français
          </button>
          <button
            onClick={() => changeLanguage('ar')}
            className={`${
              i18n.language === 'ar' ? 'bg-gray-100 dark:bg-gray-700' : ''
            } block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700`}
            role="menuitem"
          >
            العربية
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;