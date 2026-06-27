import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  onClick,
  hoverable = false,
  glass = false,
  animate = false,
  delay = 0,
  ...props
}) => {
  const cardStyles = `
    rounded-2xl border bg-white dark:bg-zinc-900 border-slate-100 dark:border-zinc-800/80 shadow-sm p-5 md:p-6 transition-all duration-200 
    ${hoverable ? 'hover:shadow-md hover:border-slate-200 dark:hover:border-zinc-700/80 cursor-pointer hover:translate-y-[-2px]' : ''} 
    ${glass ? 'glass' : ''} 
    ${className}
  `;

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut', delay }}
        onClick={onClick}
        className={cardStyles}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div onClick={onClick} className={cardStyles} {...props}>
      {children}
    </div>
  );
};

export default Card;
