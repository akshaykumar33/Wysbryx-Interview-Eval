"use client";

import * as React from "react";

interface AvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Avatar({ name, size = "md", className = "" }: AvatarProps) {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "CA";

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-base font-bold",
  };

  return (
    <div
      className={`rounded-full bg-gradient-to-tr from-[var(--brand-primary)] to-amber-400 text-white font-mono font-bold flex items-center justify-center shadow-md border border-white/20 select-none ${sizeClasses[size]} ${className}`}
    >
      {initials}
    </div>
  );
}
