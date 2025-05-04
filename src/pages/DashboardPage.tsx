import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import HabitCard from '../components/HabitCard';
import HabitForm from '../components/HabitForm';
import LogHabitForm from '../components/LogHabitForm';
import BottomNav from '../components/BottomNav';
import { Habit } from '../types';

const DashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const { state, getUserHabits, dispatch } = useApp();
  
  const [showAddHabit, setShowAddHabit] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [loggingHabit, setLoggingHabit] = useState<Habit | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  
  const habits = getUserHabits();
  
  const handleEditHabit = (habit: Habit) => {
    setEditingHabit(habit);
  };
  
  const handleDeleteHabit = (habitId: string) => {
    setShowDeleteConfirm(habitId);
  };
  
  const confirmDeleteHabit = (habitId: string) => {
    dispatch({ type: 'DELETE_HABIT', payload: habitId });
    setShowDeleteConfirm(null);
  };
  
  const handleLogHabit = (habit: Habit) => {
    setLoggingHabit(habit);
  };
  
  return (
    <div className="pb-16 md:pb-0">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {t('dashboard.welcome', { username: state.currentUser?.username })}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          {new Date().toLocaleDateString(state.currentLanguage === 'ar' ? 'ar-SA' : 'fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </motion.div>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          {t('dashboard.habits')}
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddHabit(true)}
          className="flex items-center px-3 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-1" />
          {t('habits.add')}
        </motion.button>
      </div>
      
      {habits.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center"
        >
          <div className="text-teal-500 mx-auto mb-4">
            <Plus className="h-12 w-12 mx-auto" />
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {t('dashboard.no_habits')}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddHabit(true)}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
          >
            {t('habits.add')}
          </motion.button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence>
            {habits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onEdit={handleEditHabit}
                onDelete={handleDeleteHabit}
                onLog={handleLogHabit}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
      
      <BottomNav />
      
      <AnimatePresence>
        {showAddHabit && (
          <HabitForm
            onClose={() => setShowAddHabit(false)}
          />
        )}
        
        {editingHabit && (
          <HabitForm
            existingHabit={editingHabit}
            onClose={() => setEditingHabit(null)}
          />
        )}
        
        {loggingHabit && (
          <LogHabitForm
            habit={loggingHabit}
            onClose={() => setLoggingHabit(null)}
          />
        )}
        
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-sm w-full"
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                {t('habits.confirm_delete')}
              </h3>
              <div className="flex justify-end space-x-3">
                <button
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                  onClick={() => setShowDeleteConfirm(null)}
                >
                  {t('habits.cancel')}
                </button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  onClick={() => confirmDeleteHabit(showDeleteConfirm)}
                >
                  {t('habits.delete')}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardPage;