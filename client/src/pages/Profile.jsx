import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';
import api from '../services/api';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Avatar from '../components/common/Avatar';
import { FiUser, FiBriefcase, FiLock, FiCheck } from 'react-icons/fi';

const Profile = () => {
  const { user, updateProfileInfo, updateAvatar } = useAuth();
  
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Avatar presets
  const avatars = ['teacher', 'student', 'student2', 'student3'];

  // Profile forms
  const {
    register: regProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
  } = useForm({
    defaultValues: {
      name: user?.name || '',
      institution: user?.institution || '',
    }
  });

  // Password forms
  const {
    register: regPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    watch: watchPassword,
    formState: { errors: passwordErrors },
  } = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }
  });

  const watchNewPassword = watchPassword('newPassword');

  const onUpdateProfile = async (data) => {
    try {
      setProfileLoading(true);
      await updateProfileInfo(data);
      toast.success('Profile details updated successfully.');
    } catch (err) {
      toast.error(err.message || 'Failed to update profile.');
    } finally {
      setProfileLoading(false);
    }
  };

  const onUpdatePassword = async (data) => {
    try {
      setPasswordLoading(true);
      await api.profile.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      toast.success('Password changed successfully.');
      resetPassword();
    } catch (err) {
      toast.error(err.message || 'Incorrect current password.');
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleAvatarSelect = async (avatarName) => {
    try {
      await updateAvatar(avatarName);
      toast.success('Avatar updated.');
    } catch (err) {
      toast.error('Failed to change avatar.');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold dark:text-zinc-100">My Profile</h1>
        <p className="text-sm text-slate-400">Manage your credentials, institutions, and avatars.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Profile Card Column */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <Card className="flex flex-col items-center text-center gap-4">
            <Avatar name={user?.name} role={user?.role} image={user?.profileImage} size="xl" />
            <div className="flex flex-col gap-0.5">
              <h2 className="text-xl font-bold text-slate-800 dark:text-zinc-200">{user?.name}</h2>
              <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-widest">{user?.role}</span>
            </div>
            
            <div className="w-full border-t border-slate-100 dark:border-zinc-800/80 pt-4 flex flex-col gap-1.5 text-xs text-slate-500 dark:text-zinc-400">
              <div className="flex justify-between">
                <span>Institution:</span>
                <span className="font-semibold text-slate-700 dark:text-zinc-300">{user?.institution}</span>
              </div>
              <div className="flex justify-between">
                <span>Email address:</span>
                <span className="font-semibold text-slate-700 dark:text-zinc-300">{user?.email}</span>
              </div>
            </div>
          </Card>

          {/* Avatar Selector Card */}
          <Card className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-widest">Choose Avatar</h3>
            <div className="grid grid-cols-4 gap-3">
              {avatars.map((av) => (
                <div
                  key={av}
                  onClick={() => handleAvatarSelect(av)}
                  className={`relative rounded-xl overflow-hidden cursor-pointer border-2 transition-all p-1 hover:scale-105 ${
                    user?.profileImage === av ? 'border-brand-500 bg-brand-500/5' : 'border-transparent'
                  }`}
                >
                  <Avatar name="Avatar" image={av} size="md" className="w-full h-full aspect-square" />
                  {user?.profileImage === av && (
                    <div className="absolute inset-0 flex items-center justify-center bg-brand-500/20 text-white rounded-lg">
                      <FiCheck size={16} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Form Details Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* General Profile Card */}
          <Card className="flex flex-col gap-5">
            <h3 className="text-base font-bold text-slate-800 dark:text-zinc-200">General Information</h3>
            
            <form onSubmit={handleProfileSubmit(onUpdateProfile)} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  type="text"
                  icon={FiUser}
                  error={profileErrors.name}
                  {...regProfile('name', { required: 'Name is required' })}
                />
                
                <Input
                  label="Institution"
                  type="text"
                  icon={FiBriefcase}
                  error={profileErrors.institution}
                  {...regProfile('institution', { required: 'Institution is required' })}
                />
              </div>

              <div className="flex justify-end mt-2">
                <Button type="submit" loading={profileLoading}>
                  Update Profile
                </Button>
              </div>
            </form>
          </Card>

          {/* Change Password Card */}
          <Card className="flex flex-col gap-5">
            <h3 className="text-base font-bold text-slate-800 dark:text-zinc-200">Change Password</h3>
            
            <form onSubmit={handlePasswordSubmit(onUpdatePassword)} className="flex flex-col gap-4">
              <Input
                label="Current Password"
                type="password"
                icon={FiLock}
                error={passwordErrors.currentPassword}
                {...regPassword('currentPassword', { required: 'Current password is required' })}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="New Password"
                  type="password"
                  icon={FiLock}
                  error={passwordErrors.newPassword}
                  {...regPassword('newPassword', {
                    required: 'New password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                />

                <Input
                  label="Confirm New Password"
                  type="password"
                  icon={FiLock}
                  error={passwordErrors.confirmPassword}
                  {...regPassword('confirmPassword', {
                    required: 'Confirmation is required',
                    validate: (val) => val === watchNewPassword || 'Passwords do not match',
                  })}
                />
              </div>

              <div className="flex justify-end mt-2">
                <Button type="submit" loading={passwordLoading}>
                  Change Password
                </Button>
              </div>
            </form>
          </Card>

        </div>

      </div>
    </div>
  );
};

export default Profile;
