"use client";

import React, { memo } from "react";
import { Check, X, HelpCircle, Sparkles, MessageSquare } from "lucide-react";
import { RichTapEditor } from "@/components/ui/RichTapEditor";

interface InteractiveEvaluationCardProps {
  id?: string;
  category: string;
  score: number;
  covered: boolean | null;
  notes: string;
  chips: string[];
  onScoreChange: (score: number) => void;
  onCoveredChange: (covered: boolean) => void;
  onNotesChange: (notes: string) => void;
  onOpenRubric: () => void;
}

export const InteractiveEvaluationCard = memo(function InteractiveEvaluationCard({
  id,
  category,
  score,
  covered,
  notes,
  chips,
  onScoreChange,
  onCoveredChange,
  onNotesChange,
  onOpenRubric,
}: InteractiveEvaluationCardProps) {
  const handleChipClick = (chip: string) => {
    const cleanTag = chip.replace(/^[+-]\s*/, "");
    if (notes.includes(cleanTag)) return;
    const newNotes = notes ? `${notes} • ${cleanTag}` : `• ${cleanTag}`;
    onNotesChange(newNotes);
  };

  return (
    <div
      id={id}
      className="rounded-3xl border border-slate-200 dark:border-slate-800/60 bg-white/90 dark:bg-[#0E131F]/70 backdrop-blur-xl p-6 md:p-7 shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-slate-300 dark:hover:border-slate-700/80 transition-all space-y-5"
    >
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category Title & Rubric Trigger */}
        <div className="flex items-center gap-3">
          <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
            {category}
          </h4>
          <button
            type="button"
            onClick={onOpenRubric}
            className="p-1 rounded-full text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
            title={`View evaluation guidelines for ${category}`}
          >
            <HelpCircle className="h-4 w-4" />
          </button>
        </div>

        {/* Status Pill & Score Indicator */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Covered / Missed Pill Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-800/80 p-1 rounded-full shadow-inner">
            <button
              type="button"
              onClick={() => onCoveredChange(true)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                covered === true
                  ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <Check className="h-3.5 w-3.5" /> Covered
            </button>

            <button
              type="button"
              onClick={() => onCoveredChange(false)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                covered === false
                  ? "bg-rose-500 text-white shadow-md shadow-rose-500/20"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <X className="h-3.5 w-3.5" /> Missed
            </button>
          </div>

          {/* Active Score Pill Badge */}
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-600 dark:text-amber-400 font-mono text-xs font-extrabold shadow-sm">
            <span>{score > 0 ? `${score} / 10` : "Unrated"}</span>
          </div>
        </div>
      </div>

      {/* Soothing Segmented Rating Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400 tracking-wider">
          <span className="flex items-center gap-1.5 text-amber-500 uppercase">
            <Sparkles className="h-3.5 w-3.5" /> Rating Score
          </span>
          <span className="text-slate-800 dark:text-slate-300 font-bold">{score > 0 ? `${score} Points` : "Select 1 - 10"}</span>
        </div>

        <div className="grid grid-cols-10 gap-1.5 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 shadow-inner">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
            const isSelected = score === num;
            return (
              <button
                key={num}
                type="button"
                onClick={() => onScoreChange(num)}
                className={`py-2 rounded-xl text-xs font-bold font-mono transition-transform duration-100 active:scale-95 cursor-pointer flex items-center justify-center ${
                  isSelected
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30 scale-105"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-900"
                }`}
              >
                {num}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Observation Chips */}
      {chips && chips.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap pt-1">
          {chips.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => handleChipClick(chip)}
              className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300 hover:border-amber-500/60 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-500/10 transition-all cursor-pointer shadow-sm flex items-center gap-1"
            >
              <Sparkles className="h-3 w-3 text-amber-500" /> {chip}
            </button>
          ))}
        </div>
      )}

      {/* Rich Text Tap Editor */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
          <MessageSquare className="h-3.5 w-3.5 text-amber-500" /> Evaluation Notes & Observations
        </div>
        <RichTapEditor
          value={notes}
          onChange={onNotesChange}
          placeholder={`Enter detailed evaluation observations, code snippets, or evidence for ${category}...`}
        />
      </div>
    </div>
  );
});
