import React from 'react';
import { Outlet } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { motion } from 'framer-motion';

const Layout: React.FC = () => {
  const { state } = useApp();
  
  // If no user is logged in, just render the outlet (auth pages)
  if (!state.currentUser) {
    return <Outlet />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <motion.main 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex-1 p-4 md:p-8 overflow-auto"
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
};

export default Layout;