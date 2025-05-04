import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, BarChart2, Plus, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  
  const links = [
    { to: '/dashboard', icon: <Home className="h-5 w-5" />, label: t('dashboard.habits') },
    { to: '/statistics', icon: <BarChart2 className="h-5 w-5" />, label: t('dashboard.statistics') },
    { to: '/add-habit', icon: <Plus className="h-5 w-5" />, label: t('dashboard.add_habit') },
    { to: '/profile', icon: <User className="h-5 w-5" />, label: t('dashboard.profile') },
  ];

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 shadow-md"
    >
      <div className="p-4">
        <div className="space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-200'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`
              }
            >
              {link.icon}
              <span className="mx-3">{link.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;