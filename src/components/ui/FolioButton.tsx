"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";
import { motion } from "framer-motion";

interface FolioButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export function FolioButton({ 
  variant = "primary", 
  size = "md", 
  children, 
  icon, 
  fullWidth, 
  className,
  ...props 
}: FolioButtonProps) {
  
  const variants = {
    primary: "bg-ink text-paper shadow-xl hover:bg-accent",
    secondary: "bg-accent text-paper shadow-lg hover:shadow-accent/20",
    outline: "bg-transparent border-2 border-border text-ink hover:border-accent hover:text-accent",
    ghost: "bg-transparent text-ink/60 hover:text-accent",
  };

  const sizes = {
    sm: "px-4 py-2 text-[10px]",
    md: "px-6 py-3 text-xs",
    lg: "px-10 py-5 text-lg",
    xl: "px-12 py-6 text-xl",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "rounded-full font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
      {icon}
    </motion.button>
  );
}
