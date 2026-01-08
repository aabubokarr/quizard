"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";

interface ParchmentContainerProps {
  children: React.ReactNode;
  className?: string;
  withBorder?: boolean;
  withTexture?: boolean;
}

export function ParchmentContainer({
  children,
  className,
  withBorder = false,
  withTexture = true,
}: ParchmentContainerProps) {
  return (
    <section className={cn(
      "py-24 relative overflow-hidden bg-paper",
      withBorder && "border-y border-border",
      className
    )}>
      {withTexture && (
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-[0.03] pointer-events-none" />
      )}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {children}
      </div>
    </section>
  );
}
