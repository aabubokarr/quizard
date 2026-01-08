"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";

interface ManuscriptBadgeProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export function ManuscriptBadge({ children, icon, className }: ManuscriptBadgeProps) {
  return (
    <div className={cn(
      "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/5 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest",
      className
    )}>
      {icon}
      {children}
    </div>
  );
}
