import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity } from 'lucide-react';
import AuthForm from '../components/AuthForm';
import LanguageSwitcher from '../components/LanguageSwitcher';
import ThemeToggle from '../components/ThemeToggle';

const AuthPage: React.FC = () => {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-teal-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <header className="py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <Activity className="h-8 w-8 text-teal-500" />
          <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">
            {t('app.title')}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {isLogin ? t('auth.login') : t('auth.register')}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {isLogin
                ? 'Track your habits and achieve your goals'
                : 'Create an account to start tracking your habits'}
            </p>
          </motion.div>
          
          <AnimatePresence mode="wait">
            <AuthForm
              key={isLogin ? 'login' : 'register'}
              isLogin={isLogin}
              toggleForm={() => setIsLogin(!isLogin)}
            />
          </AnimatePresence>
        </div>
      </main>
      
      <footer className="py-4 px-6 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Habits Tracker</p>
      </footer>
    </div>
  );
};

export default AuthPage;