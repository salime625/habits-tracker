import React from 'react';
import { useApp } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { state, dispatch } = useApp();
  const { t } = useTranslation();
  
  const toggleDarkMode = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      title={state.darkMode ? t('app.light_mode') : t('app.dark_mode')}
    >
      {state.darkMode ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
};

export default ThemeToggle;