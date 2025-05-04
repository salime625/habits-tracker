export interface User {
  id: string;
  username: string;
  password: string; // In a real app, this would be hashed
}

export interface Habit {
  id: string;
  userId: string;
  name: string;
  category: HabitCategory;
  targetValue: number;
  unit: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  timeAllowed: number; // in minutes, 0 for no time limit
  createdAt: string;
  logs: HabitLog[];
  color: string;
  icon: string;
}

export type HabitCategory = 'water' | 'exercise' | 'food' | 'reading' | 'meditation' | 'custom';

export interface HabitLog {
  id: string;
  habitId: string;
  date: string;
  value: number;
  duration: number; // in minutes
  completed: boolean;
  notes?: string;
}

export interface AppState {
  currentUser: User | null;
  users: User[];
  habits: Habit[];
  currentLanguage: 'ar' | 'fr';
  darkMode: boolean;
}

export type AppAction = 
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER'; payload: User }
  | { type: 'ADD_HABIT'; payload: Habit }
  | { type: 'UPDATE_HABIT'; payload: Habit }
  | { type: 'DELETE_HABIT'; payload: string }
  | { type: 'LOG_HABIT'; payload: HabitLog }
  | { type: 'UPDATE_HABIT_LOG'; payload: HabitLog }
  | { type: 'DELETE_HABIT_LOG'; payload: string }
  | { type: 'CHANGE_LANGUAGE'; payload: 'ar' | 'fr' }
  | { type: 'TOGGLE_DARK_MODE' };