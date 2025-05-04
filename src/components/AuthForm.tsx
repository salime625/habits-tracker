import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { User, Lock } from 'lucide-react';

interface AuthFormProps {
  isLogin: boolean;
  toggleForm: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin, toggleForm }) => {
  const { t } = useTranslation();
  const { login, register } = useApp();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username) {
      setError(t('auth.username_required'));
      return;
    }
    
    if (!password) {
      setError(t('auth.password_required'));
      return;
    }
    
    if (isLogin) {
      const success = login(username, password);
      if (!success) {
        setError(t('auth.login_failed'));
      }
    } else {
      const success = register(username, password);
      if (!success) {
        setError(t('auth.registration_failed'));
      }
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          {isLogin ? t('auth.login') : t('auth.register')}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('auth.username')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500 transition duration-150 ease-in-out sm:text-sm"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('auth.password')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500 transition duration-150 ease-in-out sm:text-sm"
              />
            </div>
          </div>
          
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm"
            >
              {error}
            </motion.div>
          )}
          
          <div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
            >
              {isLogin ? t('auth.login') : t('auth.register')}
            </motion.button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <button 
            onClick={toggleForm}
            className="text-sm text-teal-600 hover:text-teal-500 transition-colors"
          >
            {isLogin ? t('auth.no_account') : t('auth.has_account')}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AuthForm;