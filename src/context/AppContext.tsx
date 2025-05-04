import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AppState, AppAction, User, Habit, HabitLog } from '../types';

const initialState: AppState = {
  currentUser: null,
  users: [],
  habits: [],
  currentLanguage: 'fr',
  darkMode: false
};

const loadState = (): AppState => {
  try {
    const savedState = localStorage.getItem('habitsAppState');
    if (savedState) {
      return JSON.parse(savedState);
    }
    return initialState;
  } catch (error) {
    console.error('Failed to load state from localStorage:', error);
    return initialState;
  }
};

const saveState = (state: AppState) => {
  try {
    localStorage.setItem('habitsAppState', JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save state to localStorage:', error);
  }
};

const reducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        currentUser: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        currentUser: null
      };
    case 'REGISTER':
      return {
        ...state,
        users: [...state.users, action.payload],
        currentUser: action.payload
      };
    case 'ADD_HABIT':
      return {
        ...state,
        habits: [...state.habits, action.payload]
      };
    case 'UPDATE_HABIT':
      return {
        ...state,
        habits: state.habits.map(habit => 
          habit.id === action.payload.id ? action.payload : habit
        )
      };
    case 'DELETE_HABIT':
      return {
        ...state,
        habits: state.habits.filter(habit => habit.id !== action.payload)
      };
    case 'LOG_HABIT':
      return {
        ...state,
        habits: state.habits.map(habit => 
          habit.id === action.payload.habitId
            ? { ...habit, logs: [...habit.logs, action.payload] }
            : habit
        )
      };
    case 'UPDATE_HABIT_LOG':
      return {
        ...state,
        habits: state.habits.map(habit => 
          habit.id === action.payload.habitId
            ? { 
                ...habit, 
                logs: habit.logs.map(log => 
                  log.id === action.payload.id ? action.payload : log
                ) 
              }
            : habit
        )
      };
    case 'DELETE_HABIT_LOG':
      return {
        ...state,
        habits: state.habits.map(habit => ({
          ...habit,
          logs: habit.logs.filter(log => log.id !== action.payload)
        }))
      };
    case 'CHANGE_LANGUAGE':
      return {
        ...state,
        currentLanguage: action.payload
      };
    case 'TOGGLE_DARK_MODE':
      return {
        ...state,
        darkMode: !state.darkMode
      };
    default:
      return state;
  }
};

interface AppContextProps {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  login: (username: string, password: string) => boolean;
  register: (username: string, password: string) => boolean;
  logout: () => void;
  addHabit: (habit: Omit<Habit, 'id' | 'userId' | 'createdAt' | 'logs'>) => void;
  logHabit: (habitId: string, value: number, duration?: number, notes?: string) => void;
  getUserHabits: () => Habit[];
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, loadState());

  useEffect(() => {
    saveState(state);
    
    // Set the direction attribute on the document body based on the language
    document.documentElement.dir = state.currentLanguage === 'ar' ? 'rtl' : 'ltr';
    
    // Apply dark mode
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state]);

  const login = (username: string, password: string): boolean => {
    const user = state.users.find(
      u => u.username === username && u.password === password
    );
    
    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
      return true;
    }
    
    return false;
  };

  const register = (username: string, password: string): boolean => {
    // Check if user already exists
    if (state.users.some(u => u.username === username)) {
      return false;
    }
    
    const newUser: User = {
      id: uuidv4(),
      username,
      password
    };
    
    dispatch({ type: 'REGISTER', payload: newUser });
    return true;
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const addHabit = (habitData: Omit<Habit, 'id' | 'userId' | 'createdAt' | 'logs'>) => {
    if (!state.currentUser) return;
    
    const newHabit: Habit = {
      id: uuidv4(),
      userId: state.currentUser.id,
      createdAt: new Date().toISOString(),
      logs: [],
      ...habitData
    };
    
    dispatch({ type: 'ADD_HABIT', payload: newHabit });
  };

  const logHabit = (habitId: string, value: number, duration = 0, notes = '') => {
    const newLog: HabitLog = {
      id: uuidv4(),
      habitId,
      date: new Date().toISOString(),
      value,
      duration,
      completed: true,
      notes
    };
    
    dispatch({ type: 'LOG_HABIT', payload: newLog });
  };

  const getUserHabits = (): Habit[] => {
    if (!state.currentUser) return [];
    return state.habits.filter(habit => habit.userId === state.currentUser?.id);
  };

  return (
    <AppContext.Provider 
      value={{ 
        state, 
        dispatch, 
        login, 
        register, 
        logout, 
        addHabit, 
        logHabit, 
        getUserHabits 
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};