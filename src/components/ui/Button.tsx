"use client";

import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-sans font-semibold transition-transform duration-150 ease-out focus:outline-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed select-none active:scale-95 transform-gpu";

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 text-white font-bold shadow-lg shadow-amber-500/25 border border-amber-400/80 hover:brightness-110 hover:scale-[1.02] hover:shadow-amber-500/35",
    secondary:
      "bg-slate-900/90 dark:bg-slate-800 text-slate-100 border border-slate-700/80 hover:border-slate-600 hover:bg-slate-800 dark:hover:bg-slate-700 hover:text-white shadow-md hover:scale-[1.01]",
    outline:
      "border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950/60 text-slate-800 dark:text-slate-200 hover:border-amber-500/80 hover:text-amber-500 hover:bg-amber-500/10 shadow-sm",
    ghost:
      "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200/60 dark:hover:bg-slate-800/80 border border-transparent",
    danger:
      "bg-rose-500/15 text-rose-600 dark:text-rose-300 border border-rose-500/40 hover:bg-rose-500 hover:text-white shadow-md shadow-rose-500/10",
  };

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs rounded-xl gap-1.5",
    md: "px-4 py-2 text-xs md:text-sm rounded-xl gap-2",
    lg: "px-6 py-3 text-sm font-bold rounded-2xl gap-2.5",
  };

  return (
    <button
      type={props.type || "button"}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      ) : (
        leftIcon
      )}

      <span className="tracking-tight">{children}</span>

      {!isLoading && rightIcon}
    </button>
  );
}
