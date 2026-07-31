"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { Search, Zap, RotateCcw, Sparkles, Folder, Sun, Moon, Laptop, ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { GROUPS } from "@/utils/constants";

interface CommandMenuProps {
  onLoadSample: () => void;
  onReset: () => void;
  onGenerate: () => void;
  onOpenSaved: () => void;
}

export function CommandMenu({ onLoadSample, onReset, onGenerate, onOpenSaved }: CommandMenuProps) {
  const [open, setOpen] = useState(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  if (!open) return null;

  return (
    <div
      onClick={() => setOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden"
      >
        <Command className="w-full">
          <div className="flex items-center border-b border-slate-200 dark:border-slate-800 px-3.5">
            <Search className="h-4 w-4 shrink-0 text-slate-400 mr-2" />
            <Command.Input
              placeholder="Type a command or search categories... (Press Esc to exit)"
              className="w-full bg-transparent py-3.5 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
            />
          </div>
          <Command.List className="max-h-80 overflow-y-auto p-2 text-xs">
            <Command.Empty className="py-6 text-center text-slate-500">No results found.</Command.Empty>

            <Command.Group heading="Quick Actions" className="px-2 py-1.5 text-[10px] font-mono uppercase text-slate-500 font-semibold">
              <Command.Item
                onSelect={() => {
                  onGenerate();
                  setOpen(false);
                }}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-slate-800 dark:text-slate-200 hover:bg-amber-500 hover:text-white dark:hover:bg-amber-500 dark:hover:text-white cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-500 group-hover:text-white" />
                  <span>Generate Evaluation</span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  onLoadSample();
                  setOpen(false);
                }}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-amber-500" />
                  <span>Load Ayush Data</span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  onOpenSaved();
                  setOpen(false);
                }}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Folder className="h-4 w-4 text-blue-500" />
                  <span>View Saved Scorecards</span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  onReset();
                  setOpen(false);
                }}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4 text-rose-500" />
                  <span>Reset Scorecard</span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Appearance" className="px-2 py-1.5 text-[10px] font-mono uppercase text-slate-500 font-semibold mt-2">
              <Command.Item
                onSelect={() => {
                  setTheme("dark");
                  setOpen(false);
                }}
                className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <Moon className="h-4 w-4 text-purple-400" />
                <span>Switch to Dark Mode</span>
              </Command.Item>
              <Command.Item
                onSelect={() => {
                  setTheme("light");
                  setOpen(false);
                }}
                className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <Sun className="h-4 w-4 text-amber-500" />
                <span>Switch to Light Mode</span>
              </Command.Item>
              <Command.Item
                onSelect={() => {
                  setTheme("system");
                  setOpen(false);
                }}
                className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <Laptop className="h-4 w-4 text-slate-400" />
                <span>Use System Preference</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Categories" className="px-2 py-1.5 text-[10px] font-mono uppercase text-slate-500 font-semibold mt-2">
              {GROUPS.flatMap((g) => g.cats).map((c) => (
                <Command.Item
                  key={c}
                  onSelect={() => {
                    const slug = c.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                    const el = document.getElementById("cat-" + slug);
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                    setOpen(false);
                  }}
                  className="flex items-center justify-between rounded-xl px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <span>{c}</span>
                  <span className="text-[10px] font-mono text-slate-400">Jump</span>
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
