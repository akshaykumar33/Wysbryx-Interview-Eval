"use client";

import React, { memo } from "react";
import {
  Table as TableIcon,
  Folder,
  Zap,
  Search,
  Sun,
  Moon,
  Sparkles,
  RotateCcw,
  UserPlus,
} from "lucide-react";

interface FloatingRightActionDockProps {
  activeView: "intake" | "scorecard" | "profile" | "analytics" | "directory";
  onViewChange: (view: "intake" | "scorecard" | "profile" | "analytics" | "directory") => void;
  savedCount: number;
  onOpenSaved: () => void;
  onLoadSample: () => void;
  onReset: () => void;
  onGenerate: () => void;
  onOpenSearch: () => void;
  isGenerating: boolean;
  theme: string | undefined;
  onToggleTheme: () => void;
  mounted: boolean;
}

export const FloatingRightActionDock = memo(function FloatingRightActionDock({
  activeView,
  onViewChange,
  savedCount,
  onOpenSaved,
  onLoadSample,
  onReset,
  onGenerate,
  onOpenSearch,
  isGenerating,
  theme,
  onToggleTheme,
  mounted,
}: FloatingRightActionDockProps) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3.5 items-center select-none">
      {/* 0. New Candidate (+) */}
      <div className="relative group">
        <button
          type="button"
          onClick={onReset}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-150 active:scale-95 cursor-pointer shadow-xl border ${
            activeView === "intake"
              ? "bg-emerald-600 border-emerald-400 text-white shadow-emerald-500/40 scale-105"
              : "bg-white/90 dark:bg-slate-900/90 border-emerald-500/50 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white hover:scale-110"
          }`}
          title="New Candidate"
        >
          <UserPlus className="h-5 w-5" />
        </button>
        <span className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-950 text-xs font-semibold text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-2xl pointer-events-none font-sans">
          + New Candidate
        </span>
      </div>

      {/* 1. Candidate Directory Icon */}
      <div className="relative group">
        <button
          type="button"
          onClick={() => onViewChange("directory")}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-150 active:scale-95 cursor-pointer shadow-xl border ${
            activeView === "directory"
              ? "bg-purple-600 border-purple-400 text-white shadow-purple-500/40 scale-105"
              : "bg-white/90 dark:bg-slate-900/90 border-purple-500/50 text-purple-600 dark:text-purple-400 hover:bg-purple-500 hover:text-white hover:scale-110"
          }`}
          title="Candidate Directory"
        >
          <TableIcon className="h-5 w-5" />
        </button>
        <span className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-950 text-xs font-semibold text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-2xl pointer-events-none font-sans">
          Candidate Directory
        </span>
      </div>

      {/* 2. Saved Scorecards Drawer Icon */}
      <div className="relative group">
        <button
          type="button"
          onClick={onOpenSaved}
          className="w-12 h-12 rounded-full bg-white/90 dark:bg-slate-900/90 border border-blue-500/50 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-500 hover:text-white transition-transform duration-150 hover:scale-110 active:scale-95 cursor-pointer shadow-xl relative"
          title="Saved Scorecards"
        >
          <Folder className="h-5 w-5" />
          {savedCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white dark:border-slate-900">
              {savedCount}
            </span>
          )}
        </button>
        <span className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-950 text-xs font-semibold text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-2xl pointer-events-none font-sans">
          Saved Scorecards ({savedCount})
        </span>
      </div>

      {/* 3. Demo Data Icon */}
      <div className="relative group">
        <button
          type="button"
          onClick={onLoadSample}
          className="w-12 h-12 rounded-full bg-white/90 dark:bg-slate-900/90 border border-amber-500/50 flex items-center justify-center text-amber-500 hover:bg-amber-500 hover:text-white transition-transform duration-150 hover:scale-110 active:scale-95 cursor-pointer shadow-xl"
          title="Load Ayush Data"
        >
          <Zap className="h-5 w-5" />
        </button>
        <span className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-950 text-xs font-semibold text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-2xl pointer-events-none font-sans">
          Load Ayush Data
        </span>
      </div>

      {/* 4. Reset Scorecard Icon */}
      <div className="relative group">
        <button
          type="button"
          onClick={onReset}
          className="w-12 h-12 rounded-full bg-white/90 dark:bg-slate-900/90 border border-rose-500/50 flex items-center justify-center text-rose-500 dark:text-rose-400 hover:bg-rose-500 hover:text-white transition-transform duration-150 hover:scale-110 active:scale-95 cursor-pointer shadow-xl"
          title="Reset Scorecard"
        >
          <RotateCcw className="h-5 w-5" />
        </button>
        <span className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-950 text-xs font-semibold text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-2xl pointer-events-none font-sans">
          Reset Scorecard
        </span>
      </div>

      {/* 5. Search Command Menu Icon */}
      <div className="relative group">
        <button
          type="button"
          onClick={onOpenSearch}
          className="w-12 h-12 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700/80 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-transform duration-150 hover:scale-110 active:scale-95 cursor-pointer shadow-xl"
          title="Search Command Menu (⌘K)"
        >
          <Search className="h-5 w-5" />
        </button>
        <span className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-950 text-xs font-semibold text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-2xl pointer-events-none font-sans">
          Search Menu (⌘K)
        </span>
      </div>

      {/* 6. Theme Toggle Icon */}
      {mounted && (
        <div className="relative group">
          <button
            type="button"
            onClick={onToggleTheme}
            className="w-12 h-12 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700/80 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-transform duration-150 hover:scale-110 active:scale-95 cursor-pointer shadow-xl"
            title="Toggle Theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-amber-400" />
            ) : (
              <Moon className="h-5 w-5 text-slate-700" />
            )}
          </button>
          <span className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-950 text-xs font-semibold text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-2xl pointer-events-none font-sans">
            Toggle Theme
          </span>
        </div>
      )}

      {/* 7. Generate Evaluation Gold CTA */}
      <div className="relative group mt-2">
        <button
          type="button"
          onClick={onGenerate}
          disabled={isGenerating}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-400 border border-amber-300 flex items-center justify-center text-white shadow-2xl hover:scale-110 active:scale-95 transition-transform duration-150 cursor-pointer disabled:opacity-50"
          title="Generate Evaluation Report"
        >
          <Sparkles className="h-6 w-6" />
        </button>
        <span className="absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-950 text-xs font-bold text-amber-600 dark:text-amber-400 border border-amber-500/40 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-2xl pointer-events-none font-sans">
          Generate Evaluation
        </span>
      </div>
    </div>
  );
});
