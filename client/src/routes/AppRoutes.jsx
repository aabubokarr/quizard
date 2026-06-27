import React from 'react';
import { Routes, Route, Navigate } from 'react-router';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import ProtectedRoute from './ProtectedRoute';

// Dynamic Pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import NotFound from '../pages/NotFound';

// Teacher Pages
import TeacherDashboard from '../pages/teacher/Dashboard';
import QuestionManagement from '../pages/teacher/QuestionManagement';
import ExamManagement from '../pages/teacher/ExamManagement';
import ExamResults from '../pages/teacher/ExamResults';

// Student Pages
import StudentDashboard from '../pages/student/Dashboard';
import ExamTaking from '../pages/student/ExamTaking';
import ExamResult from '../pages/student/ExamResult';

// Core Pages
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<Home />} />

      {/* Authentication Routes wrapper */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      {/* Standalone Protected Quiz Engine Route (no dashboard sidebar margins) */}
      <Route
        path="/student/exam/taking"
        element={
          <ProtectedRoute allowedRoles={['Student']}>
            <ExamTaking />
          </ProtectedRoute>
        }
      />

      {/* Dashboard Routes wrapper */}
      <Route element={<DashboardLayout />}>
        {/* Redirect empty dashboard to login */}
        <Route path="/dashboard" element={<Navigate to="/login" replace />} />

        {/* Teacher Dashboards */}
        <Route
          path="/teacher/dashboard"
          element={
            <ProtectedRoute allowedRoles={['Teacher']}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/questions"
          element={
            <ProtectedRoute allowedRoles={['Teacher']}>
              <QuestionManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/exams"
          element={
            <ProtectedRoute allowedRoles={['Teacher']}>
              <ExamManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/exams/results/:examId"
          element={
            <ProtectedRoute allowedRoles={['Teacher']}>
              <ExamResults />
            </ProtectedRoute>
          }
        />

        {/* Student Dashboards */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRoles={['Student']}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/exam/result/:submissionId"
          element={
            <ProtectedRoute allowedRoles={['Student', 'Teacher']}>
              <ExamResult />
            </ProtectedRoute>
          }
        />

        {/* General User Profiles */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* 404 Catch All */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
