import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { registerUser, clearError } from '../redux/authSlice';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { FiUser, FiMail, FiLock, FiBriefcase } from 'react-icons/fi';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      institution: '',
      password: '',
      role: 'Student',
    }
  });

  const watchRole = watch('role');

  const onSubmit = async (data) => {
    dispatch(clearError());
    const resultAction = await dispatch(registerUser(data));
    
    if (registerUser.fulfilled.match(resultAction)) {
      toast.success('Account created successfully!');
      const role = resultAction.payload.user.role;
      if (role === 'Teacher') {
        navigate('/teacher/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    } else {
      toast.error(resultAction.payload || 'Registration failed');
    }
  };

  const roleOptions = [
    { label: 'Student', value: 'Student' },
    { label: 'Teacher', value: 'Teacher' }
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5 text-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-zinc-100">Create Account</h2>
        <p className="text-sm text-slate-500 dark:text-zinc-400">
          Get started with Quizard assessments today
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          label="Full Name"
          type="text"
          icon={FiUser}
          placeholder="e.g. John Doe"
          error={errors.name}
          {...register('name', {
            required: 'Name is required',
            minLength: {
              value: 2,
              message: 'Name must be at least 2 characters',
            },
          })}
        />

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
          label="Institution / School"
          type="text"
          icon={FiBriefcase}
          placeholder="e.g. Stanford University"
          error={errors.institution}
          {...register('institution', {
            required: 'Institution is required',
          })}
        />

        <div className="grid grid-cols-1 gap-4">
          <Input
            label="System Role"
            type="select"
            options={roleOptions}
            error={errors.role}
            {...register('role', {
              required: 'Role is required',
            })}
          />
        </div>

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

        {error && (
          <div className="p-3 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 text-rose-600 dark:text-rose-400 rounded-xl text-sm text-center">
            {error}
          </div>
        )}

        <Button type="submit" loading={loading} className="w-full mt-2">
          Create Account
        </Button>
      </form>

      <div className="text-center text-sm text-slate-500 dark:text-zinc-400 mt-2">
        Already have an account?{' '}
        <Link
          to="/login"
          className="text-brand-600 hover:text-brand-700 dark:text-brand-400 font-semibold hover:underline"
        >
          Log in
        </Link>
      </div>
    </div>
  );
};

export default Register;
