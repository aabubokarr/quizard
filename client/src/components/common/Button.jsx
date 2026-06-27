import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon = null,
  iconPosition = 'left',
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';
  
  const variants = {
    primary: 'bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg shadow-brand-500/25',
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-200 border border-slate-200/50 dark:border-zinc-700/50',
    success: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/25',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-500/25',
    ghost: 'bg-transparent hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200',
    glass: 'glass hover:bg-white/20 dark:hover:bg-black/20 text-slate-800 dark:text-zinc-200 border border-white/20'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-sm md:text-base gap-2',
    lg: 'px-6 py-3 text-base md:text-lg gap-2.5'
  };

  return (
    <motion.button
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {!loading && Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 16 : size === 'lg' ? 22 : 18} />}
      {children}
      {!loading && Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 16 : size === 'lg' ? 22 : 18} />}
    </motion.button>
  );
};

export default Button;
