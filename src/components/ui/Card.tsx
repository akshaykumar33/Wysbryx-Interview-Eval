"use client";

import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  hoverable?: boolean;
}

export function Card({
  children,
  glass = true,
  hoverable = false,
  className = "",
  ...props
}: CardProps) {
  const base = "rounded-3xl transition-all duration-200 border";
  const glassStyle = glass
    ? "bg-white/80 dark:bg-[#0E131F]/70 border-slate-200 dark:border-slate-800/80 backdrop-blur-xl shadow-xl shadow-slate-200/50 dark:shadow-none"
    : "bg-white dark:bg-[#0E131F] border-slate-200 dark:border-slate-800";
  const hoverStyle = hoverable ? "hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-2xl" : "";

  return (
    <div className={`${base} ${glassStyle} ${hoverStyle} ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`border-b border-slate-200 dark:border-slate-800/80 pb-4 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h3 className={`text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight ${className}`}>{children}</h3>;
}
