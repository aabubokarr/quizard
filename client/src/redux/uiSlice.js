import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('quizard_theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

const initialState = {
  theme: getInitialTheme(),
  sidebarOpen: true,
  breadcrumbs: [],
  notifications: [
    { id: 1, title: 'New Exam Published', message: 'Data Structures & Algorithms Basics is now live.', read: false, time: '2h ago' },
    { id: 2, title: 'Results Available', message: 'Your grade for Advanced React is now ready.', read: false, time: '1d ago' },
  ],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      state.theme = newTheme;
      localStorage.setItem('quizard_theme', newTheme);
      
      // Update HTML class
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('quizard_theme', action.payload);
      if (action.payload === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    setBreadcrumbs: (state, action) => {
      state.breadcrumbs = action.payload;
    },
    markAllNotificationsRead: (state) => {
      state.notifications = state.notifications.map(n => ({ ...n, read: true }));
    },
    clearNotification: (state, action) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    }
  }
});

export const {
  toggleTheme,
  setTheme,
  toggleSidebar,
  setSidebarOpen,
  setBreadcrumbs,
  markAllNotificationsRead,
  clearNotification
} = uiSlice.actions;

export default uiSlice.reducer;
