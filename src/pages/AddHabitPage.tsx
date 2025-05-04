import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { HabitCategory } from '../types';
import BottomNav from '../components/BottomNav';
import { 
  Droplets, 
  Dumbbell, 
  Utensils, 
  BookOpen, 
  Heart, 
  X, 
  Check 
} from 'lucide-react';

const AddHabitPage: React.FC = () => {
  const { t } = useTranslation();
  const { addHabit } = useApp();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [category, setCategory] = useState<HabitCategory>('water');
  const [targetValue, setTargetValue] = useState(1);
  const [unit, setUnit] = useState('liters');
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [timeAllowed, setTimeAllowed] = useState(0);
  const [color, setColor] = useState('#14b8a6');
  const [icon, setIcon] = useState('default');
  const [error, setError] = useState('');
  
  const categoryOptions: { value: HabitCategory; label: string; icon: React.ReactNode }[] = [
    { value: 'water', label: t('categories.water'), icon: <Droplets className="h-5 w-5" /> },
    { value: 'exercise', label: t('categories.exercise'), icon: <Dumbbell className="h-5 w-5" /> },
    { value: 'food', label: t('categories.food'), icon: <Utensils className="h-5 w-5" /> },
    { value: 'reading', label: t('categories.reading'), icon: <BookOpen className="h-5 w-5" /> },
    { value: 'meditation', label: t('categories.meditation'), icon: <Heart className="h-5 w-5" /> },
    { value: 'custom', label: t('categories.custom'), icon: <div className="h-5 w-5" /> },
  ];
  
  const unitOptions = [
    'liters', 'ml', 'kg', 'g', 'minutes', 'hours', 'times', 'pages', 'steps', 'calories', 'custom'
  ];
  
  const frequencyOptions = ['daily', 'weekly', 'monthly'];
  
  const colorOptions = [
    '#14b8a6', '#8b5cf6', '#ec4899', '#f97316', '#84cc16', '#06b6d4', '#6366f1'
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name) {
      setError('Name is required');
      return;
    }
    
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
    
    navigate('/dashboard');
  };
  
  return (
    <div className="pb-16 md:pb-0">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6 flex justify-between items-center"
      >
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {t('habits.add')}
        </h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
      </motion.div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
              placeholder="Exercise, Drink water, Read a book..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('habits.category')}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {categoryOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setCategory(option.value)}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
                    category === option.value
                      ? 'border-teal-500 bg-teal-50 dark:bg-teal-900 text-teal-700 dark:text-teal-200'
                      : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="mb-1">{option.icon}</div>
                  <span className="text-xs font-medium">{option.label}</span>
                </button>
              ))}
            </div>
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
                min={0.1}
                step={0.1}
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Color
            </label>
            <div className="flex space-x-2">
              {colorOptions.map((colorOption) => (
                <button
                  key={colorOption}
                  type="button"
                  onClick={() => setColor(colorOption)}
                  className={`relative w-8 h-8 rounded-full ${color === colorOption ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                  style={{ backgroundColor: colorOption }}
                >
                  {color === colorOption && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}
                </button>
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
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
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
      </div>
      
      <BottomNav />
    </div>
  );
};

export default AddHabitPage;