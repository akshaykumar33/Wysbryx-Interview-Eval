"use client";

import { CandidateProfile } from "@/types/candidate";
import { X, Table as TableIcon } from "lucide-react";
import { CandidateDataTable } from "./CandidateDataTable";
import { Button } from "../ui/Button";

interface CandidateDirectoryDrawerProps {
  isOpen: boolean;
  candidates: CandidateProfile[];
  onClose: () => void;
  onSelectCandidate: (candidate: CandidateProfile) => void;
}

export function CandidateDirectoryDrawer({
  isOpen,
  candidates,
  onClose,
  onSelectCandidate,
}: CandidateDirectoryDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-3xl h-full border-l border-slate-800 bg-[#0E131F] shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2 text-lg font-bold text-slate-100">
              <TableIcon className="h-5 w-5 text-amber-500" />
              <span>Candidate Directory & Pipeline</span>
            </div>
            <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-100 rounded-md transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          <p className="text-xs text-slate-400">
            Select any candidate from the directory pipeline below to inspect their executive profile, evaluation status, and analytics report.
          </p>

          <CandidateDataTable
            candidates={candidates}
            onSelectCandidate={(cand) => {
              onSelectCandidate(cand);
              onClose();
            }}
          />
        </div>

        <div className="pt-6 border-t border-slate-800 flex justify-end">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close Directory
          </Button>
        </div>
      </div>
    </div>
  );
}
