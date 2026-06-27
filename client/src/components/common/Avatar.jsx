import React from 'react';

const Avatar = ({ name = 'User', role = 'Student', image = null, size = 'md', className = '' }) => {
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm font-medium',
    lg: 'w-16 h-16 text-lg font-bold',
    xl: 'w-24 h-24 text-2xl font-bold',
  };

  const getInitials = (n) => {
    return n
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  // Modern Premium Avatars using custom SVG gradients or initial drawings
  const getMockAvatarUrl = (imgType) => {
    // If it's a type string, resolve to beautiful SVG drawings or dicebear-like graphics
    if (imgType === 'teacher') {
      return 'https://api.dicebear.com/7.x/adventurer/svg?seed=Sarah&backgroundColor=b6e3f4';
    }
    if (imgType === 'student') {
      return 'https://api.dicebear.com/7.x/adventurer/svg?seed=Alex&backgroundColor=ffd5dc';
    }
    if (imgType === 'student2') {
      return 'https://api.dicebear.com/7.x/adventurer/svg?seed=Emily&backgroundColor=d1d4f9';
    }
    if (imgType === 'student3') {
      return 'https://api.dicebear.com/7.x/adventurer/svg?seed=Marcus&backgroundColor=c0aede';
    }
    return null;
  };

  const mockUrl = getMockAvatarUrl(image);

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-xl overflow-hidden shadow-inner shrink-0 ${
        sizeClasses[size]
      } ${
        !mockUrl ? 'bg-gradient-to-tr from-brand-500 to-indigo-600 text-white' : ''
      } ${className}`}
    >
      {mockUrl ? (
        <img
          src={mockUrl}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  );
};

export default Avatar;
