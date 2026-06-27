import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams, Link } from 'react-router';
import toast from 'react-hot-toast';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { FiLock, FiKey, FiArrowLeft } from 'react-icons/fi';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      code: '',
      password: '',
      confirmPassword: '',
    }
  });

  const watchPassword = watch('password');

  const onSubmit = async (data) => {
    if (data.code !== '123456') {
      toast.error('Invalid verification code. Enter "123456" for demo simulation.');
      return;
    }
    
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    
    toast.success('Password reset completed successfully!');
    navigate('/login');
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5 text-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-zinc-100">Reset Password</h2>
        <p className="text-sm text-slate-500 dark:text-zinc-400">
          Enter the code sent to <span className="font-semibold text-slate-700 dark:text-zinc-300">{email || 'your email'}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          label="Verification Code"
          type="text"
          icon={FiKey}
          placeholder="Enter 123456"
          error={errors.code}
          {...register('code', {
            required: 'Verification code is required',
          })}
        />

        <Input
          label="New Password"
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

        <Input
          label="Confirm Password"
          type="password"
          icon={FiLock}
          placeholder="••••••••"
          error={errors.confirmPassword}
          {...register('confirmPassword', {
            required: 'Confirm password is required',
            validate: (val) => val === watchPassword || 'Passwords do not match',
          })}
        />

        <Button type="submit" loading={loading} className="w-full mt-2">
          Reset Password
        </Button>
      </form>

      <div className="text-center text-sm mt-2">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-200 font-medium hover:underline"
        >
          <FiArrowLeft size={16} /> Back to Log In
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
