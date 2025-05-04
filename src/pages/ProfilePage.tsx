import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { User, LogOut, HelpCircle } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import ThemeToggle from '../components/ThemeToggle';
import LanguageSwitcher from '../components/LanguageSwitcher';

const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const { state, logout, getUserHabits } = useApp();
  
  const habits = getUserHabits();
  const completedHabits = habits.filter(habit => 
    habit.logs.length > 0
  ).length;
  
  const faqQuestions = [
    { key: 'q1', icon: 'plus' },
    { key: 'q2', icon: 'chart' },
    { key: 'q3', icon: 'edit' },
    { key: 'q4', icon: 'check' }
  ];

  return (
    <div className="pb-16 md:pb-0">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {t('dashboard.profile')}
        </h1>
      </motion.div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mr-4">
              <User className="h-8 w-8 text-teal-600 dark:text-teal-300" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {state.currentUser?.username}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {completedHabits} / {habits.length} habits active
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-medium text-gray-800 dark:text-white">
            Settings
          </h3>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-700 dark:text-gray-300">Theme</span>
            <ThemeToggle />
          </div>
          
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-700 dark:text-gray-300">Language</span>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
          <HelpCircle className="h-5 w-5 text-teal-500 mr-2" />
          <h3 className="font-medium text-gray-800 dark:text-white">
            {t('faq.title')}
          </h3>
        </div>
        
        <div className="p-4 space-y-4">
          {faqQuestions.map((question) => (
            <motion.div
              key={question.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0"
            >
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                {t(`faq.questions.${question.key}`)}
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                {t(`faq.questions.a${question.key.slice(1)}`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={logout}
        className="w-full flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
      >
        <LogOut className="h-5 w-5 mr-2" />
        {t('auth.logout')}
      </motion.button>
      
      <BottomNav />
    </div>
  );
};

export default ProfilePage;