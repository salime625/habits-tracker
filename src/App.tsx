import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import './i18n';
import Layout from './components/Layout';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import StatisticsPage from './pages/StatisticsPage';
import AddHabitPage from './pages/AddHabitPage';
import ProfilePage from './pages/ProfilePage';

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { state } = useApp();
  
  if (!state.currentUser) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

// Auth route component (redirects to dashboard if already logged in)
const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { state } = useApp();
  
  if (state.currentUser) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const { state } = useApp();
  
  // Set page title
  useEffect(() => {
    document.title = state.currentLanguage === 'ar' ? 'متتبع العادات' : 'Suiveur d\'Habitudes';
  }, [state.currentLanguage]);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          
          <Route 
            path="/auth" 
            element={
              <AuthRoute>
                <AuthPage />
              </AuthRoute>
            } 
          />
          
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/statistics" 
            element={
              <ProtectedRoute>
                <StatisticsPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/add-habit" 
            element={
              <ProtectedRoute>
                <AddHabitPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
};

export default App;