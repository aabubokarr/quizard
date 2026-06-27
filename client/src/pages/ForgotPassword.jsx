import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router';
import toast from 'react-hot-toast';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { FiMail, FiArrowLeft } from 'react-icons/fi';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    }
  });

  const onSubmit = async (data) => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    
    toast.success('Simulation: Password reset code is "123456"');
    navigate(`/reset-password?email=${encodeURIComponent(data.email)}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5 text-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-zinc-100">Forgot Password</h2>
        <p className="text-sm text-slate-500 dark:text-zinc-400">
          Enter your email and we'll send you a password reset code
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

        <Button type="submit" loading={loading} className="w-full mt-2">
          Send Reset Code
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

export default ForgotPassword;
