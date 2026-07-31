"use client";

import { useRef } from "react";
import { Bold, Italic, Code, List, ListOrdered, Quote, Sparkles } from "lucide-react";

interface RichTapEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function RichTapEditor({ value, onChange, placeholder }: RichTapEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const applyFormat = (prefix: string, suffix: string = "") => {
    if (!textareaRef.current) return;
    const el = textareaRef.current;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const text = el.value;
    const selected = text.substring(start, end);

    let replacement = "";
    if (selected) {
      replacement = `${prefix}${selected}${suffix}`;
    } else {
      replacement = `${prefix}${suffix}`;
    }

    const newText = text.substring(0, start) + replacement + text.substring(end);
    onChange(newText);

    setTimeout(() => {
      el.focus();
      const newCursor = start + prefix.length + (selected ? selected.length : 0);
      el.setSelectionRange(newCursor, newCursor);
    }, 10);
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0B0F19]/90 shadow-sm overflow-hidden focus-within:border-amber-500/80 transition-all">
      {/* Format Tap Bar */}
      <div className="flex items-center justify-between gap-1 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950/70 px-3 py-1.5 overflow-x-auto">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => applyFormat("**", "**")}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            title="Bold"
          >
            <Bold className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => applyFormat("*", "*")}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            title="Italic"
          >
            <Italic className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => applyFormat("`", "`")}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            title="Inline Code"
          >
            <Code className="h-3.5 w-3.5" />
          </button>
          <span className="w-px h-4 bg-slate-300 dark:bg-slate-800 mx-1" />
          <button
            type="button"
            onClick={() => applyFormat("• ")}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            title="Bullet List"
          >
            <List className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => applyFormat("1. ")}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            title="Numbered List"
          >
            <ListOrdered className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => applyFormat("> ")}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            title="Quote"
          >
            <Quote className="h-3.5 w-3.5" />
          </button>
        </div>

        <span className="text-[10px] font-mono text-amber-500 font-semibold flex items-center gap-1">
          <Sparkles className="h-3 w-3" /> Rich Tap Editor
        </span>
      </div>

      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full bg-transparent px-4 py-3 text-xs md:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none resize-y font-sans leading-relaxed"
      />
    </div>
  );
}
