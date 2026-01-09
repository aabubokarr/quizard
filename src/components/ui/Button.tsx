import React from "react";
import { cn } from "@/lib/utils/cn";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "icon";
  size?: "sm" | "md" | "lg" | "xl" | "icon";
  children?: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export function Button({ 
  variant = "primary", 
  size = "md", 
  children, 
  icon, 
  fullWidth, 
  className,
  ...props 
}: ButtonProps) {
  
  const variants = {
    primary: "bg-ink text-paper shadow-xl hover:bg-accent hover:text-white border-2 border-transparent",
    secondary: "bg-accent text-paper shadow-lg hover:shadow-accent/40 hover:scale-105 border-2 border-transparent",
    outline: "bg-transparent border-2 border-ink/20 text-ink hover:border-accent hover:text-accent",
    ghost: "bg-transparent text-ink/60 hover:text-accent hover:bg-ink/5",
    icon: "bg-ink text-paper rounded-full shadow-lg hover:bg-accent hover:scale-110 active:scale-95",
  };

  const sizes = {
    sm: "px-4 py-2 text-[10px]",
    md: "px-6 py-3 text-xs",
    lg: "px-10 py-5 text-sm",
    xl: "px-12 py-6 text-base",
    icon: "h-10 w-10 p-0 flex items-center justify-center",
  };

  return (
    <motion.button
      whileHover={{ scale: variant === 'icon' ? 1.1 : 1.02 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3",
        variant === "icon" ? "rounded-full" : "rounded-lg",
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
