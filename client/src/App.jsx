import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppRoutes from './routes/AppRoutes';
import { loadCurrentUser } from './redux/authSlice';
import { setTheme } from './redux/uiSlice';

const App = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.ui);
  const token = useSelector((state) => state.auth.token);

  // Sync theme class with HTML node on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem('quizard_theme');
    if (savedTheme) {
      dispatch(setTheme(savedTheme));
    } else {
      // Default to dark mode if preferred by system
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      dispatch(setTheme(prefersDark ? 'dark' : 'light'));
    }
  }, [dispatch]);

  // Load current user profile if token is available on refresh/visit
  useEffect(() => {
    const hasToken = localStorage.getItem('quizard_token') || sessionStorage.getItem('quizard_token');
    if (hasToken) {
      dispatch(loadCurrentUser());
    }
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-bg text-slate-800 dark:text-zinc-200 transition-colors duration-350">
      <AppRoutes />
    </div>
  );
};

export default App;
