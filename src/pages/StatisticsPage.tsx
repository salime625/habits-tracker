import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { BarChart2, Calendar, TrendingUp } from 'lucide-react';
import BottomNav from '../components/BottomNav';

const StatisticsPage: React.FC = () => {
  const { t } = useTranslation();
  const { getUserHabits } = useApp();
  const [period, setPeriod] = useState<'today' | 'week' | 'month' | 'all'>('week');
  
  const habits = getUserHabits();
  
  // Calculate completion rates for each habit
  const habitStats = habits.map(habit => {
    // This is a simplified calculation
    const completionRate = habit.logs.length > 0
      ? Math.min((habit.logs.reduce((sum, log) => sum + log.value, 0) / (habit.targetValue * 5)) * 100, 100)
      : 0;
      
    return {
      id: habit.id,
      name: habit.name,
      category: habit.category,
      color: habit.color,
      completionRate,
      streakDays: Math.floor(Math.random() * 10), // Placeholder for streak calculation
      totalLogs: habit.logs.length,
    };
  });
  
  const totalHabits = habits.length;
  const activeHabits = habits.filter(h => h.logs.some(log => {
    const logDate = new Date(log.date);
    const now = new Date();
    const dayDiff = Math.floor((now.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24));
    return dayDiff < 7;
  })).length;
  
  const avgCompletionRate = habitStats.length > 0
    ? Math.round(habitStats.reduce((sum, stat) => sum + stat.completionRate, 0) / habitStats.length)
    : 0;
  
  return (
    <div className="pb-16 md:pb-0">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          {t('dashboard.statistics')}
        </h1>
        
        <div className="flex space-x-2 mb-6">
          {(['today', 'week', 'month', 'all'] as const).map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                period === p
                  ? 'bg-teal-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {t(`dashboard.${p}`)}
            </button>
          ))}
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total Habits</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{totalHabits}</p>
            </div>
            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
              <BarChart2 className="h-6 w-6 text-blue-500 dark:text-blue-300" />
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Active Habits</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{activeHabits}</p>
            </div>
            <div className="p-2 rounded-full bg-green-100 dark:bg-green-900">
              <Calendar className="h-6 w-6 text-green-500 dark:text-green-300" />
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Avg. Completion Rate</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{avgCompletionRate}%</p>
            </div>
            <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900">
              <TrendingUp className="h-6 w-6 text-purple-500 dark:text-purple-300" />
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            {t('habits.completion_rate')}
          </h2>
        </div>
        
        <div className="p-4">
          {habitStats.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-6">
              No habit data available
            </p>
          ) : (
            <div className="space-y-4">
              {habitStats.map(stat => (
                <div key={stat.id} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700 dark:text-gray-300">{stat.name}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{Math.round(stat.completionRate)}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.completionRate}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: stat.color }}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default StatisticsPage;