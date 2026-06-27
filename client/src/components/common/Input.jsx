import React, { forwardRef, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Input = forwardRef(({
  label,
  type = 'text',
  error,
  icon: Icon = null,
  className = '',
  textarea = false,
  rows = 4,
  options = [], // For select input type
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const baseInputStyles = `w-full rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-600 ${
    Icon ? 'pl-10' : 'px-4'
  } ${isPassword ? 'pr-10' : 'pr-4'} py-2.5 text-sm md:text-base ${
    error ? 'border-rose-500 ring-2 ring-rose-500/10 focus:border-rose-500 focus:ring-rose-500/20' : ''
  }`;

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-slate-400 dark:text-zinc-600 pointer-events-none">
            <Icon size={18} />
          </div>
        )}
        
        {textarea ? (
          <textarea
            ref={ref}
            rows={rows}
            className={`${baseInputStyles} py-3`}
            {...props}
          />
        ) : type === 'select' ? (
          <select
            ref={ref}
            className={`${baseInputStyles} appearance-none bg-no-repeat bg-[right_1rem_center]`}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-white dark:bg-zinc-950 text-slate-800 dark:text-slate-200">
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            ref={ref}
            type={inputType}
            className={baseInputStyles}
            {...props}
          />
        )}

        {isPassword && !textarea && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 text-slate-400 dark:text-zinc-600 hover:text-slate-600 dark:hover:text-zinc-400 transition-colors focus:outline-none cursor-pointer"
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        )}
      </div>
      {error && (
        <span className="text-xs md:text-sm text-rose-500 mt-0.5">
          {error.message || error}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
