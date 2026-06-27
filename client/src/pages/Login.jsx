import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { loginUser, clearError } from '../redux/authSlice';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { FiMail, FiLock } from 'react-icons/fi';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = async (data) => {
    dispatch(clearError());
    const resultAction = await dispatch(loginUser({ credentials: data, rememberMe }));
    
    if (loginUser.fulfilled.match(resultAction)) {
      toast.success('Logged in successfully!');
      const role = resultAction.payload.user.role;
      if (role === 'Teacher') {
        navigate('/teacher/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    } else {
      toast.error(resultAction.payload || 'Login failed');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5 text-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-zinc-100">Welcome Back</h2>
        <p className="text-sm text-slate-500 dark:text-zinc-400">
          Enter your workspace details to continue
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          label="Email Address"
          type="email"
          icon={FiMail}
          placeholder="e.g. email@example.com"
          error={errors.email}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
        />

        <Input
          label="Password"
          type="password"
          icon={FiLock}
          placeholder="••••••••"
          error={errors.password}
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
        />

        {/* Remember Me and Forgot Password */}
        <div className="flex items-center justify-between text-sm mt-1">
          <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-zinc-400 select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4.5 h-4.5 rounded border-slate-300 dark:border-zinc-700 text-brand-600 focus:ring-brand-500/20"
            />
            Remember me
          </label>
          <Link
            to="/forgot-password"
            className="text-brand-600 hover:text-brand-700 dark:text-brand-400 font-medium hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 text-rose-600 dark:text-rose-400 rounded-xl text-sm text-center">
            {error}
          </div>
        )}

        <Button type="submit" loading={loading} className="w-full mt-2">
          Log In
        </Button>
      </form>

      <div className="text-center text-sm text-slate-500 dark:text-zinc-400 mt-2">
        Don't have an account?{' '}
        <Link
          to="/register"
          className="text-brand-600 hover:text-brand-700 dark:text-brand-400 font-semibold hover:underline"
        >
          Sign up
        </Link>
      </div>

      {/* Demo Credentials Helper Box */}
      <div className="p-4 rounded-2xl bg-brand-500/5 border border-brand-500/10 text-xs text-slate-500 dark:text-zinc-400 flex flex-col gap-1.5 mt-2">
        <span className="font-bold text-slate-700 dark:text-zinc-300">Quick Demo Accounts:</span>
        <div className="flex justify-between">
          <span>Teacher: <code className="text-brand-600 dark:text-brand-400">teacher@quizard.com</code></span>
          <span>Pass: <code className="text-brand-600 dark:text-brand-400">password</code></span>
        </div>
        <div className="flex justify-between">
          <span>Student: <code className="text-brand-600 dark:text-brand-400">student@quizard.com</code></span>
          <span>Pass: <code className="text-brand-600 dark:text-brand-400">password</code></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
