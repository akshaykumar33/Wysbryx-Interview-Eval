"use client";

import React from "react";
import { Search, Zap, Folder, RotateCcw, Sparkles, Sun, Moon, CheckCircle } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/Button";

interface DockNavigationProps {
  candidate: string;
  role: string;
  ratedCount: number;
  totalCats: number;
  autoSaveTime: string | null;
  onOpenCommand: () => void;
  onLoadSample: () => void;
  onOpenSaved: () => void;
  onReset: () => void;
  onGenerate: () => void;
  isGenerating: boolean;
  savedCount: number;
}

export function DockNavigation({
  candidate,
  role,
  ratedCount,
  totalCats,
  autoSaveTime,
  onOpenCommand,
  onLoadSample,
  onOpenSaved,
  onReset,
  onGenerate,
  isGenerating,
  savedCount,
}: DockNavigationProps) {
  const { theme, setTheme } = useTheme();
  const progressPct = Math.round((ratedCount / totalCats) * 100);

  return (
    <header className="sticky top-4 z-40 max-w-7xl mx-auto w-[calc(100%-48px)]">
      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface-glass)] backdrop-blur-2xl p-3 px-5 shadow-design-lg flex items-center justify-between gap-4">
        {/* Brand & Workspace Switcher */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <img src="https://www.wysbryx.com/wysbryx_v.png" alt="wysbryx logo" className="w-8 h-8 object-contain drop-shadow-md" />
          <div>
            <div className="font-extrabold text-lg text-[var(--text-contrast)] tracking-tight leading-none">
              wys<span className="text-[var(--brand-primary)]">bryx</span>
            </div>
            <div className="text-[9.5px] font-mono text-[var(--text-muted)] uppercase tracking-wider mt-0.5">
              AI Interview Platform
            </div>
          </div>
        </div>

        {/* Command Menu Search Trigger */}
        <button
          onClick={onOpenCommand}
          className="hidden md:flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface-subtle)] px-3.5 py-1.5 text-xs text-[var(--text-muted)] hover:border-[var(--border-hover)] hover:text-[var(--text-contrast)] transition-all shadow-sm"
        >
          <Search className="h-3.5 w-3.5" />
          <span>Search categories or press ⌘K...</span>
          <kbd className="ml-2 font-mono text-[10px] bg-[var(--bg-surface-elevated)] px-1.5 py-0.5 rounded text-[var(--text-body)] border border-[var(--border-subtle)]">
            ⌘K
          </kbd>
        </button>

        {/* Inputs */}
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <input
            value={candidate}
            onChange={(e) => {}}
            placeholder="Candidate Name..."
            readOnly
            className="w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-subtle)] px-3 py-1.5 text-xs text-[var(--text-contrast)] focus:border-[var(--brand-primary)] focus:outline-none pointer-events-none"
          />
        </div>

        {/* Live Auto-Save & Progress Capsule */}
        <div className="hidden lg:flex items-center gap-3 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface-subtle)] px-3.5 py-1.5">
          {autoSaveTime && (
            <div className="flex items-center gap-1 text-[10.5px] font-mono text-emerald-400">
              <CheckCircle className="h-3 w-3" /> Auto-saved {autoSaveTime}
            </div>
          )}
          <div className="w-12 h-1 bg-[var(--bg-surface-elevated)] rounded-full overflow-hidden">
            <div className="h-full bg-[var(--brand-primary)] transition-all duration-300" style={{ width: `${progressPct}%` }} />
          </div>
          <span className="font-mono text-[11px] text-[var(--text-body)] font-semibold">{ratedCount}/{totalCats}</span>
        </div>

        {/* Actions Dock */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-subtle)] text-[var(--text-body)] hover:text-[var(--text-contrast)] transition-colors"
            title="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <Button variant="secondary" size="sm" onClick={onLoadSample} leftIcon={<Zap className="h-3.5 w-3.5 text-amber-500" />}>
            Demo Data
          </Button>

          <Button variant="secondary" size="sm" onClick={onOpenSaved} leftIcon={<Folder className="h-3.5 w-3.5 text-blue-400" />}>
            Saved ({savedCount})
          </Button>

          <Button variant="ghost" size="sm" onClick={onReset} leftIcon={<RotateCcw className="h-3.5 w-3.5" />}>
            Reset
          </Button>

          <Button variant="primary" size="sm" onClick={onGenerate} isLoading={isGenerating} leftIcon={<Sparkles className="h-3.5 w-3.5" />}>
            Generate Evaluation
          </Button>
        </div>
      </div>
    </header>
  );
}
