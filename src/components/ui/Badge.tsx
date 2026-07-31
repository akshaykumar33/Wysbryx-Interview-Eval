"use client";

import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "good" | "signal" | "risk" | "brand" | "neutral";
}

export function Badge({ className = "", variant = "neutral", children, ...props }: BadgeProps) {
  const base = "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-semibold uppercase tracking-wider border";
  
  const variants = {
    good: "bg-[var(--semantic-good-bg)] border-[var(--semantic-good)] text-[var(--semantic-good)]",
    signal: "bg-[var(--semantic-signal-bg)] border-[var(--semantic-signal)] text-[var(--semantic-signal)]",
    risk: "bg-[var(--semantic-risk-bg)] border-[var(--semantic-risk)] text-[var(--semantic-risk)]",
    brand: "bg-[var(--brand-primary-glow)] border-[var(--brand-primary)] text-[var(--brand-primary)]",
    neutral: "bg-[var(--bg-surface-subtle)] border-[var(--border-subtle)] text-[var(--text-body)]",
  };

  return (
    <span className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
}
