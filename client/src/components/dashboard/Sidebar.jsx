import React from 'react';
import { NavLink, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { logout } from '../../redux/authSlice';
import { toggleSidebar } from '../../redux/uiSlice';
import Avatar from '../common/Avatar';
import {
  FiHome,
  FiBookOpen,
  FiFileText,
  FiUser,
  FiSettings,
  FiLogOut,
  FiX,
  FiAward
} from 'react-icons/fi';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { sidebarOpen } = useSelector((state) => state.ui);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const teacherLinks = [
    { name: 'Dashboard', path: '/teacher/dashboard', icon: FiHome },
    { name: 'Manage Questions', path: '/teacher/questions', icon: FiBookOpen },
    { name: 'Manage Exams', path: '/teacher/exams', icon: FiFileText },
  ];

  const studentLinks = [
    { name: 'Dashboard', path: '/student/dashboard', icon: FiHome },
  ];

  const commonLinks = [
    { name: 'My Profile', path: '/profile', icon: FiUser },
    { name: 'Settings', path: '/settings', icon: FiSettings },
  ];

  const links = user?.role === 'Teacher' ? teacherLinks : studentLinks;

  const sidebarVariants = {
    open: { x: 0, opacity: 1, width: 280 },
    closed: { x: -280, opacity: 0, width: 0 }
  };

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/10'
        : 'text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-slate-50 dark:hover:bg-zinc-800/40 border border-transparent'
    }`;

  return (
    <>
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => dispatch(toggleSidebar())}
          className="fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm z-30 lg:hidden"
        />
      )}

      <motion.aside
        initial="closed"
        animate={sidebarOpen ? 'open' : 'closed'}
        variants={sidebarVariants}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`fixed top-0 bottom-0 left-0 bg-white dark:bg-zinc-900 border-r border-slate-100 dark:border-zinc-800/80 z-40 flex flex-col justify-between overflow-hidden shadow-sm`}
      >
        <div className="flex flex-col flex-1">
          {/* Logo & Close */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-50 dark:border-zinc-800/40">
            <NavLink to="/" className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white shadow-md shadow-brand-500/20">
                <FiAward size={20} />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-zinc-100 dark:to-zinc-300 bg-clip-text text-transparent">
                Quizard
              </span>
            </NavLink>
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 dark:text-zinc-500 hover:bg-slate-50 dark:hover:bg-zinc-800 cursor-pointer"
            >
              <FiX size={18} />
            </button>
          </div>

          {/* User Preview */}
          <div className="mx-6 my-5 p-4 rounded-2xl bg-slate-50/50 dark:bg-zinc-800/20 border border-slate-100/50 dark:border-zinc-800/40 flex items-center gap-3">
            <Avatar name={user?.name} role={user?.role} image={user?.profileImage} />
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-slate-800 dark:text-zinc-200 truncate">
                {user?.name}
              </span>
              <span className="text-xs text-slate-400 dark:text-zinc-500 truncate">
                {user?.role} • {user?.institution || 'Quizard User'}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 flex flex-col gap-1.5 overflow-y-auto">
            <span className="px-4 text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider mb-1">
              Menu
            </span>
            {links.map((link) => (
              <NavLink key={link.path} to={link.path} className={navItemClass}>
                <link.icon size={18} className="shrink-0" />
                {link.name}
              </NavLink>
            ))}

            <span className="px-4 text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider mt-5 mb-1">
              Account
            </span>
            {commonLinks.map((link) => (
              <NavLink key={link.path} to={link.path} className={navItemClass}>
                <link.icon size={18} className="shrink-0" />
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Logout Footer */}
        <div className="p-4 border-t border-slate-50 dark:border-zinc-800/40 bg-slate-50/20 dark:bg-zinc-900/40">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-rose-500 hover:bg-rose-500/10 hover:text-rose-600 dark:hover:bg-rose-950/20 dark:hover:text-rose-400 border border-transparent transition-all cursor-pointer"
          >
            <FiLogOut size={18} />
            Log Out
          </button>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
