"use client";

import * as React from "react";

interface SliderProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (val: number) => void;
  className?: string;
}

export function Slider({ value, min = 0, max = 10, step = 1, onChange, className = "" }: SliderProps) {
  return (
    <div className={`relative flex items-center select-none touch-none w-full ${className}`}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-[var(--bg-surface-elevated)] rounded-lg appearance-none cursor-pointer accent-[var(--brand-primary)] focus:outline-none"
      />
    </div>
  );
}
