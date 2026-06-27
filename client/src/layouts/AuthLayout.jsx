import React from 'react';
import { Outlet, Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import { FiAward } from 'react-icons/fi';

const AuthLayout = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (isAuthenticated && user) {
    const redirectPath = user.role === 'Teacher' ? '/teacher/dashboard' : '/student/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-bg transition-colors duration-300 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Decorative background shapes */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-brand-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        {/* Brand Header */}
        <div className="flex items-center gap-2.5 mb-8">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white shadow-xl shadow-brand-500/25">
            <FiAward size={26} />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-zinc-100 dark:to-zinc-300 bg-clip-text text-transparent">
            Quizard
          </span>
        </div>

        {/* Content Box */}
        <div className="w-full bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-slate-200/50 dark:border-zinc-800/80 rounded-3xl p-6 md:p-8 shadow-xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
