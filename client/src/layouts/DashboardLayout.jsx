import React, { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import Sidebar from '../components/dashboard/Sidebar';
import TopNavbar from '../components/dashboard/TopNavbar';
import { setSidebarOpen } from '../redux/uiSlice';

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { sidebarOpen } = useSelector((state) => state.ui);

  // Auto-close sidebar on smaller screens by default
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        dispatch(setSidebarOpen(false));
      } else {
        dispatch(setSidebarOpen(true));
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial run

    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-bg text-slate-800 dark:text-zinc-200 transition-colors duration-300 font-sans flex overflow-hidden">
      {/* Persistent Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div 
        className="flex-1 flex flex-col min-w-0 transition-all duration-300"
        style={{
          paddingLeft: sidebarOpen && window.innerWidth >= 1024 ? '280px' : '0px'
        }}
      >
        <TopNavbar />

        {/* Dynamic Pages */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
