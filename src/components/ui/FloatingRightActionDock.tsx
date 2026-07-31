"use client";

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
  isGenerating: boolean;
  theme: string | undefined;
  onToggleTheme: () => void;
  mounted: boolean;
}

export function FloatingRightActionDock({
  activeView,
  onViewChange,
  savedCount,
  onOpenSaved,
  onLoadSample,
  onReset,
  onGenerate,
  isGenerating,
  theme,
  onToggleTheme,
  mounted,
}: FloatingRightActionDockProps) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3.5 items-center">
      {/* 0. New Candidate (+) */}
      <div className="relative group">
        <button
          onClick={onReset}
          className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-2xl border ${
            activeView === "intake"
              ? "bg-emerald-600 border-emerald-400 text-white shadow-emerald-500/40"
              : "bg-white/90 dark:bg-slate-900/90 border-emerald-500/50 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white"
          }`}
          title="New Candidate"
        >
          <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping opacity-75 pointer-events-none" />
          <UserPlus className="h-5 w-5 relative z-10" />
        </button>
        <span className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-950 text-xs font-semibold text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-2xl pointer-events-none font-sans">
          + New Candidate
        </span>
      </div>

      {/* 1. Candidate Directory Pulsing Icon */}
      <div className="relative group">
        <button
          onClick={() => onViewChange("directory")}
          className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-2xl border ${
            activeView === "directory"
              ? "bg-purple-600 border-purple-400 text-white shadow-purple-500/40"
              : "bg-white/90 dark:bg-slate-900/90 border-purple-500/50 text-purple-600 dark:text-purple-400 hover:bg-purple-500 hover:text-white"
          }`}
          title="Candidate Directory"
        >
          <span className="absolute -inset-1 rounded-full bg-purple-500/30 animate-ping opacity-75 pointer-events-none" />
          <TableIcon className="h-5 w-5 relative z-10" />
        </button>
        <span className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-950 text-xs font-semibold text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-2xl pointer-events-none font-sans">
          Candidate Directory
        </span>
      </div>

      {/* 2. Saved Scorecards Drawer Pulsing Icon */}
      <div className="relative group">
        <button
          onClick={onOpenSaved}
          className="relative w-12 h-12 rounded-full bg-white/90 dark:bg-slate-900/90 border border-blue-500/50 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-500 hover:text-white transition-all cursor-pointer shadow-2xl"
          title="Saved Scorecards"
        >
          <span className="absolute -inset-1 rounded-full bg-blue-500/25 animate-pulse opacity-75 pointer-events-none" />
          <Folder className="h-5 w-5 relative z-10" />
          {savedCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center z-20 border-2 border-white dark:border-slate-900">
              {savedCount}
            </span>
          )}
        </button>
        <span className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-950 text-xs font-semibold text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-2xl pointer-events-none font-sans">
          Saved Scorecards ({savedCount})
        </span>
      </div>

      {/* 3. Demo Data Pulsing Icon */}
      <div className="relative group">
        <button
          onClick={onLoadSample}
          className="relative w-12 h-12 rounded-full bg-white/90 dark:bg-slate-900/90 border border-amber-500/50 flex items-center justify-center text-amber-500 hover:bg-amber-500 hover:text-white transition-all cursor-pointer shadow-2xl"
          title="Load Ayush Data"
        >
          <span className="absolute -inset-1 rounded-full bg-amber-500/25 animate-pulse opacity-75 pointer-events-none" />
          <Zap className="h-5 w-5 relative z-10" />
        </button>
        <span className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-950 text-xs font-semibold text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-2xl pointer-events-none font-sans">
          Load Ayush Data
        </span>
      </div>

      {/* 4. Reset Scorecard Pulsing Icon */}
      <div className="relative group">
        <button
          onClick={onReset}
          className="relative w-12 h-12 rounded-full bg-white/90 dark:bg-slate-900/90 border border-rose-500/50 flex items-center justify-center text-rose-500 dark:text-rose-400 hover:bg-rose-500 hover:text-white transition-all cursor-pointer shadow-2xl"
          title="Reset Scorecard"
        >
          <span className="absolute -inset-1 rounded-full bg-rose-500/20 animate-pulse opacity-50 pointer-events-none" />
          <RotateCcw className="h-5 w-5 relative z-10" />
        </button>
        <span className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-950 text-xs font-semibold text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-2xl pointer-events-none font-sans">
          Reset Scorecard
        </span>
      </div>

      {/* 5. Search Command Menu Pulsing Icon */}
      <div className="relative group">
        <button
          onClick={() => {
            const down = new KeyboardEvent("keydown", { key: "k", metaKey: true });
            document.dispatchEvent(down);
          }}
          className="relative w-12 h-12 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700/80 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer shadow-2xl"
          title="Search Command Menu (⌘K)"
        >
          <span className="absolute -inset-1 rounded-full bg-slate-500/20 animate-pulse opacity-50 pointer-events-none" />
          <Search className="h-5 w-5 relative z-10" />
        </button>
        <span className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-950 text-xs font-semibold text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-2xl pointer-events-none font-sans">
          Search Menu (⌘K)
        </span>
      </div>

      {/* 6. Theme Toggle Pulsing Icon */}
      {mounted && (
        <div className="relative group">
          <button
            onClick={onToggleTheme}
            className="relative w-12 h-12 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700/80 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer shadow-2xl"
            title="Toggle Theme"
          >
            <span className="absolute -inset-1 rounded-full bg-slate-500/20 animate-pulse opacity-50 pointer-events-none" />
            {theme === "dark" ? (
              <Sun className="h-5 w-5 relative z-10 text-amber-400" />
            ) : (
              <Moon className="h-5 w-5 relative z-10 text-slate-700" />
            )}
          </button>
          <span className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-950 text-xs font-semibold text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-2xl pointer-events-none font-sans">
            Toggle Theme
          </span>
        </div>
      )}

      {/* 7. Generate Evaluation Pulsing Gold CTA */}
      <div className="relative group mt-2">
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-400 border border-amber-300 flex items-center justify-center text-white shadow-2xl hover:scale-105 transition-all cursor-pointer disabled:opacity-50"
          title="Generate Evaluation Report"
        >
          <span className="absolute -inset-1.5 rounded-full bg-amber-500/40 animate-ping opacity-90 pointer-events-none" />
          <Sparkles className="h-6 w-6 relative z-10 animate-spin-slow" />
        </button>
        <span className="absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-950 text-xs font-bold text-amber-600 dark:text-amber-400 border border-amber-500/40 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-2xl pointer-events-none font-sans">
          Generate Evaluation
        </span>
      </div>
    </div>
  );
}
