import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Edit, Trash, BarChart, Droplets, Dumbbell, Utensils, BookOpen, Heart } from 'lucide-react';
import { Habit } from '../types';
import { useApp } from '../context/AppContext';

interface HabitCardProps {
  habit: Habit;
  onEdit: (habit: Habit) => void;
  onDelete: (habitId: string) => void;
  onLog: (habit: Habit) => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onEdit, onDelete, onLog }) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Calculate progress
  const progress = Math.min(
    (habit.logs.reduce((sum, log) => sum + log.value, 0) / habit.targetValue) * 100,
    100
  );
  
  // Get streak count (consecutive days with logs)
  const streakCount = 0; // This would need a more complex calculation based on daily completions
  
  // Get icon based on category
  const getIcon = () => {
    switch (habit.category) {
      case 'water':
        return <Droplets className="h-6 w-6" />;
      case 'exercise':
        return <Dumbbell className="h-6 w-6" />;
      case 'food':
        return <Utensils className="h-6 w-6" />;
      case 'reading':
        return <BookOpen className="h-6 w-6" />;
      case 'meditation':
        return <Heart className="h-6 w-6" />;
      default:
        return <BarChart className="h-6 w-6" />;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ${isExpanded ? 'h-auto' : 'h-auto'}`}
      style={{ borderLeft: `4px solid ${habit.color}` }}
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div 
              className="p-2 rounded-full mr-3" 
              style={{ backgroundColor: `${habit.color}20` }}
            >
              {getIcon()}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {habit.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {t(`categories.${habit.category}`)} · {t(`habits.${habit.frequency}`)}
              </p>
            </div>
          </div>
          <div className="w-16 h-16">
            <CircularProgressbar
              value={progress}
              text={`${Math.round(progress)}%`}
              styles={buildStyles({
                pathColor: habit.color,
                textColor: habit.color,
                trailColor: '#d6d6d6',
                textSize: '24px',
              })}
            />
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('habits.target')}: {habit.targetValue} {habit.unit}
            </p>
            {habit.timeAllowed > 0 && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('habits.time_allowed')}: {habit.timeAllowed} {t('habits.minutes')}
              </p>
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('habits.streak')}: {streakCount} {t('habits.days')}
            </p>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onLog(habit)}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
          >
            {t('habits.log')}
          </motion.button>
          
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(habit)}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <Edit className="h-5 w-5" />
            </button>
            <button
              onClick={() => onDelete(habit.id)}
              className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded-full transition-colors"
            >
              <Trash className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HabitCard;