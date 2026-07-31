"use client";

import { FileCode2 } from "lucide-react";

interface ObservationEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export function ObservationEditor({ value, onChange, placeholder = "Record observations, architecture decisions, code trade-offs..." }: ObservationEditorProps) {
  const lineCount = Math.max(1, value.split("\n").length);

  return (
    <div className="rounded-xl border border-slate-800 bg-[#0B0F17] overflow-hidden focus-within:border-amber-500/60 focus-within:ring-1 focus-within:ring-amber-500/20 transition-all shadow-inner">
      {/* Mini IDE Editor Header Bar */}
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-slate-900/80 border-b border-slate-800/80 text-[10px] font-mono text-slate-400 select-none">
        <div className="flex items-center gap-2">
          <FileCode2 className="h-3 w-3 text-amber-500" />
          <span className="font-semibold text-slate-300">OBSERVATIONS & TRADE-OFFS</span>
        </div>
        <div className="flex items-center gap-3 text-[9px] text-slate-400">
          <span>{lineCount} {lineCount === 1 ? "line" : "lines"}</span>
          <span className="text-amber-500/80 font-semibold">MARKDOWN</span>
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="flex">
        {/* Line Prompt Gutter */}
        <div className="px-2.5 py-3 bg-slate-950/40 border-r border-slate-800/60 font-mono text-[11px] text-slate-400 select-none text-right min-w-[28px] leading-relaxed">
          1
        </div>

        {/* Text Area Input */}
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent p-3 text-xs md:text-sm text-slate-100 placeholder-slate-500 focus:outline-none min-h-[76px] resize-y leading-relaxed font-mono tracking-tight"
        />
      </div>
    </div>
  );
}
