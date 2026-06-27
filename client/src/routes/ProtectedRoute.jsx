import React from 'react';
import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import { StatsSkeleton } from '../components/common/Skeletons';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-slate-50 dark:bg-zinc-950">
        <div className="w-full max-w-4xl">
          <StatsSkeleton />
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If they aren't authorized, redirect to their role's dashboard
    const fallbackPath = user.role === 'Teacher' ? '/teacher/dashboard' : '/student/dashboard';
    return <Navigate to={fallbackPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
