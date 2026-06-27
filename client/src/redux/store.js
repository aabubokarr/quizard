import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import questionReducer from './questionSlice';
import examReducer from './examSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    questions: questionReducer,
    exams: examReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Turn off serializable check for simple Date operations
    }),
});

export default store;
