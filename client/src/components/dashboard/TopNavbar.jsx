import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toggleSidebar, toggleTheme, markAllNotificationsRead } from '../../redux/uiSlice';
import { logout } from '../../redux/authSlice';
import Dropdown from '../common/Dropdown';
import Avatar from '../common/Avatar';
import {
  FiMenu,
  FiSun,
  FiMoon,
  FiBell,
  FiUser,
  FiSettings,
  FiLogOut,
  FiChevronDown
} from 'react-icons/fi';

const TopNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { theme, breadcrumbs, notifications } = useSelector((state) => state.ui);
  
  const [unreadNotifications, setUnreadNotifications] = useState(
    notifications.filter(n => !n.read).length
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleNotificationsClick = () => {
    dispatch(markAllNotificationsRead());
    setUnreadNotifications(0);
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-white/70 dark:bg-zinc-950/70 border-b border-slate-100 dark:border-zinc-800/80 backdrop-blur-md">
      {/* Left side: Hamburger and Breadcrumbs */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="p-2 -ml-2 rounded-xl text-slate-500 hover:bg-slate-50 dark:hover:bg-zinc-900 hover:text-slate-800 dark:hover:text-zinc-200 transition-colors cursor-pointer"
        >
          <FiMenu size={20} />
        </button>

        <nav className="hidden md:flex items-center text-sm font-medium">
          <span className="text-slate-400 dark:text-zinc-500">Quizard</span>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <span className="mx-2 text-slate-300 dark:text-zinc-700">/</span>
              <span className={idx === breadcrumbs.length - 1 ? 'text-slate-800 dark:text-zinc-200 font-semibold' : 'text-slate-400 dark:text-zinc-500'}>
                {crumb}
              </span>
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Right side: Actions & User Menu */}
      <div className="flex items-center gap-3">
        {/* Dark/Light Theme Toggle */}
        <button
          onClick={() => dispatch(toggleTheme())}
          className="p-2 rounded-xl text-slate-500 hover:bg-slate-50 dark:hover:bg-zinc-900 hover:text-slate-800 dark:hover:text-zinc-200 transition-colors cursor-pointer"
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          {theme === 'light' ? <FiMoon size={19} /> : <FiSun size={19} />}
        </button>

        {/* Notifications Dropdown */}
        <Dropdown
          trigger={
            <button 
              onClick={handleNotificationsClick}
              className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-50 dark:hover:bg-zinc-900 hover:text-slate-800 dark:hover:text-zinc-200 transition-colors cursor-pointer"
            >
              <FiBell size={19} />
              {unreadNotifications > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 border border-white dark:border-zinc-950 rounded-full" />
              )}
            </button>
          }
        >
          <div className="py-2.5 px-4 font-semibold text-sm border-b border-slate-50 dark:border-zinc-800/60 text-slate-800 dark:text-zinc-200 flex justify-between">
            <span>Notifications</span>
            {unreadNotifications > 0 && <span className="text-xs bg-rose-500 text-white px-2 py-0.5 rounded-full">{unreadNotifications} new</span>}
          </div>
          <div className="max-h-64 overflow-y-auto divide-y divide-slate-50 dark:divide-zinc-800/40">
            {notifications.map((n) => (
              <div key={n.id} className="p-3 text-xs hover:bg-slate-50 dark:hover:bg-zinc-800/20 cursor-pointer">
                <p className="font-semibold text-slate-700 dark:text-zinc-300">{n.title}</p>
                <p className="text-slate-400 dark:text-zinc-500 mt-0.5">{n.message}</p>
                <span className="text-[10px] text-slate-300 dark:text-zinc-600 block mt-1">{n.time}</span>
              </div>
            ))}
          </div>
        </Dropdown>

        {/* User Settings Dropdown */}
        <Dropdown
          trigger={
            <button className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-900 transition-all cursor-pointer">
              <Avatar name={user?.name} role={user?.role} image={user?.profileImage} size="sm" />
              <span className="hidden sm:inline text-sm font-medium text-slate-700 dark:text-zinc-300">
                {user?.name?.split(' ')[0]}
              </span>
              <FiChevronDown size={14} className="text-slate-400" />
            </button>
          }
        >
          <div className="px-4 py-3 border-b border-slate-50 dark:border-zinc-800/60">
            <p className="text-sm font-semibold text-slate-800 dark:text-zinc-200 truncate">{user?.name}</p>
            <p className="text-xs text-slate-400 dark:text-zinc-500 truncate mt-0.5">{user?.email}</p>
          </div>
          <div className="py-1">
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2.5 w-full text-left px-4 py-2 text-xs md:text-sm text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800 hover:text-slate-800 dark:hover:text-zinc-200 transition-colors"
            >
              <FiUser size={16} /> My Profile
            </button>
            <button
              onClick={() => navigate('/settings')}
              className="flex items-center gap-2.5 w-full text-left px-4 py-2 text-xs md:text-sm text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800 hover:text-slate-800 dark:hover:text-zinc-200 transition-colors"
            >
              <FiSettings size={16} /> Settings
            </button>
          </div>
          <div className="py-1">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2.5 w-full text-left px-4 py-2 text-xs md:text-sm text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
            >
              <FiLogOut size={16} /> Log Out
            </button>
          </div>
        </Dropdown>
      </div>
    </header>
  );
};

export default TopNavbar;
