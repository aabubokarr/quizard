"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";
import { ManuscriptBadge } from "./ManuscriptBadge";

interface ArchivalHeaderProps {
  badge?: string;
  badgeIcon?: React.ReactNode;
  title: string;
  italicTitle?: string;
  description?: string;
  centered?: boolean;
  className?: string;
  titleClassName?: string;
}

export function ArchivalHeader({
  badge,
  badgeIcon,
  title,
  italicTitle,
  description,
  centered = true,
  className,
  titleClassName,
}: ArchivalHeaderProps) {
  return (
    <div className={cn(
      "max-w-4xl",
      centered && "mx-auto text-center flex flex-col items-center",
      className
    )}>
      {badge && (
        <ManuscriptBadge icon={badgeIcon} className="mb-8">
          {badge}
        </ManuscriptBadge>
      )}
      
      <h1 className={cn(
        "font-serif text-5xl md:text-7xl font-bold text-ink leading-tight mb-8",
        titleClassName
      )}>
        {title}{" "}
        {italicTitle && <span className="italic text-accent font-medium">{italicTitle}</span>}
      </h1>
      
      {description && (
        <p className={cn(
          "text-ink-muted text-xl md:text-2xl font-medium leading-relaxed italic",
          centered && "mx-auto"
        )}>
          {description}
        </p>
      )}
    </div>
  );
}
