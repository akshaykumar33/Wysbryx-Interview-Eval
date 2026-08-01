"use client";

import { SavedRecord } from "@/types/evaluation";
import { X, Folder, Calendar, Trash2, ChevronRight } from "lucide-react";
import { Button } from "./ui/Button";
import { Avatar } from "./ui/Avatar";
import { Badge } from "./ui/Badge";

interface SavedModalProps {
  isOpen: boolean;
  records: SavedRecord[];
  onClose: () => void;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function SavedModal({ isOpen, records, onClose, onSelect, onDelete }: SavedModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E131F] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 p-5 bg-slate-50 dark:bg-slate-900/60">
          <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 text-base">
            <Folder className="h-5 w-5 text-amber-500" />
            <span>Saved Evaluation Scorecards ({records.length})</span>
          </div>
          <button type="button" onClick={onClose} className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 rounded-md transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {records.length === 0 ? (
            <div className="py-16 text-center text-sm text-slate-500 font-sans">
              No saved evaluation scorecards found.
            </div>
          ) : (
            records.map((r) => (
              <div
                key={r.id}
                onClick={() => onSelect(r.id)}
                className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:border-amber-500/50 cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-3.5">
                  <Avatar name={r.candidate} size="md" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
                      {r.candidate}
                      <Badge variant={r.hiringDecision.includes("Hire") ? "good" : "risk"}>{r.hiringDecision}</Badge>
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1 flex items-center gap-3">
                      <span>{r.role}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(r.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="font-mono font-bold text-base text-amber-500">{r.overallScore}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">/100</span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(r.id);
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-500 rounded-md transition-colors"
                    title="Delete Scorecard"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-amber-500 transition-colors" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 dark:border-slate-800 p-4 bg-slate-50 dark:bg-slate-900/60 flex justify-end">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close Drawer
          </Button>
        </div>
      </div>
    </div>
  );
}
