"use client";

import { CheckCircle2 } from "lucide-react";

interface ToastProps {
  message: string | null;
}

export default function Toast({ message }: ToastProps) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg border border-amber-600/40 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-100 shadow-xl animate-in slide-in-from-bottom-5 duration-200">
      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
      <span>{message}</span>
    </div>
  );
}
