import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Habit, HabitCategory } from '../types';
import { X } from 'lucide-react';

interface HabitFormProps {
  existingHabit?: Habit;
  onClose: () => void;
}

const HabitForm: React.FC<HabitFormProps> = ({ existingHabit, onClose }) => {
  const { t } = useTranslation();
  const { addHabit, dispatch } = useApp();
  
  const [name, setName] = useState(existingHabit?.name || '');
  const [category, setCategory] = useState<HabitCategory>(existingHabit?.category || 'water');
  const [targetValue, setTargetValue] = useState(existingHabit?.targetValue || 1);
  const [unit, setUnit] = useState(existingHabit?.unit || 'liters');
  const [frequency, setFrequency] = useState(existingHabit?.frequency || 'daily');
  const [timeAllowed, setTimeAllowed] = useState(existingHabit?.timeAllowed || 0);
  const [color, setColor] = useState(existingHabit?.color || '#14b8a6');
  const [icon, setIcon] = useState(existingHabit?.icon || 'default');
  const [error, setError] = useState('');
  
  const categoryOptions: HabitCategory[] = ['water', 'exercise', 'food', 'reading', 'meditation', 'custom'];
  const unitOptions = ['liters', 'ml', 'kg', 'g', 'minutes', 'hours', 'times', 'pages', 'steps', 'calories', 'custom'];
  const frequencyOptions = ['daily', 'weekly', 'monthly'];
  const colorOptions = ['#14b8a6', '#8b5cf6', '#ec4899', '#f97316', '#84cc16', '#06b6d4', '#6366f1'];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name) {
      setError('Name is required');
      return;
    }
    
    if (existingHabit) {
      dispatch({
        type: 'UPDATE_HABIT',
        payload: {
          ...existingHabit,
          name,
          category,
          targetValue,
          unit,
          frequency,
          timeAllowed,
          color,
          icon,
        },
      });
    } else {
      addHabit({
        name,
        category,
        targetValue,
        unit,
        frequency,
        timeAllowed,
        color,
        icon,
      });
    }
    
    onClose();
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {existingHabit ? t('habits.edit') : t('habits.add')}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('habits.name')}
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('habits.category')}
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as HabitCategory)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {categoryOptions.map((option) => (
                <option key={option} value={option}>
                  {t(`categories.${option}`)}
                </option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="targetValue" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('habits.target')}
              </label>
              <input
                type="number"
                id="targetValue"
                value={targetValue}
                min={0}
                onChange={(e) => setTargetValue(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            
            <div>
              <label htmlFor="unit" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('habits.unit')}
              </label>
              <select
                id="unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {unitOptions.map((option) => (
                  <option key={option} value={option}>
                    {t(`units.${option}`)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('habits.frequency')}
              </label>
              <select
                id="frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as 'daily' | 'weekly' | 'monthly')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {frequencyOptions.map((option) => (
                  <option key={option} value={option}>
                    {t(`habits.${option}`)}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="timeAllowed" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('habits.time_allowed')}
              </label>
              <input
                type="number"
                id="timeAllowed"
                value={timeAllowed}
                min={0}
                onChange={(e) => setTimeAllowed(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Color
            </label>
            <div className="flex space-x-2">
              {colorOptions.map((colorOption) => (
                <button
                  key={colorOption}
                  type="button"
                  onClick={() => setColor(colorOption)}
                  className={`w-8 h-8 rounded-full ${color === colorOption ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                  style={{ backgroundColor: colorOption }}
                ></button>
              ))}
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
          
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
            >
              {t('habits.cancel')}
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="px-4 py-2 bg-teal-600 text-white rounded-md shadow-sm hover:bg-teal-700 focus:outline-none"
            >
              {t('habits.save')}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default HabitForm;