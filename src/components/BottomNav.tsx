import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, BarChart2, Plus, User } from 'lucide-react';

const BottomNav: React.FC = () => {
  const { t } = useTranslation();
  
  const links = [
    { to: '/dashboard', icon: <Home className="h-6 w-6" />, label: t('dashboard.habits') },
    { to: '/statistics', icon: <BarChart2 className="h-6 w-6" />, label: t('dashboard.statistics') },
    { to: '/add-habit', icon: <Plus className="h-6 w-6" />, label: t('dashboard.add_habit') },
    { to: '/profile', icon: <User className="h-6 w-6" />, label: t('dashboard.profile') },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg">
      <nav className="flex justify-around">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex flex-col items-center py-2 px-3 ${
                isActive
                  ? 'text-teal-600 dark:text-teal-400'
                  : 'text-gray-600 dark:text-gray-400'
              }`
            }
          >
            {link.icon}
            <span className="text-xs mt-1">{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default BottomNav;