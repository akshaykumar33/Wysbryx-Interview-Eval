"use client";

import { Info, X } from "lucide-react";
import { RUBRICS } from "@/utils/constants";

interface RubricModalProps {
  category: string | null;
  onClose: () => void;
}

export default function RubricModal({ category, onClose }: RubricModalProps) {
  if (!category) return null;

  const content = RUBRICS[category] || `
    <b class="text-slate-900 dark:text-slate-100">1 - 3:</b> Limited exposure or significant knowledge gaps.<br>
    <b class="text-slate-900 dark:text-slate-100">4 - 6:</b> Solid foundational competency with standard approaches.<br>
    <b class="text-slate-900 dark:text-slate-100">7 - 8:</b> Advanced mastery, proactive tradeoff reasoning & scalability awareness.<br>
    <b class="text-slate-900 dark:text-slate-100">9 - 10:</b> Exceptional domain expert / industry lead standard.
  `;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            <Info className="h-5 w-5 text-amber-500" />
            Rating Guide: {category}
          </h3>
          <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="text-sm leading-relaxed text-slate-700 dark:text-slate-300" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}
