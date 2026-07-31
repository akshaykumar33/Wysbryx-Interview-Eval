"use client";

import { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table";
import { CandidateProfile } from "@/types/candidate";
import { Search, ArrowUpDown, ArrowRight, FileSpreadsheet, Building2, Clock, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CandidateDataTableProps {
  candidates: CandidateProfile[];
  onSelectCandidate: (candidate: CandidateProfile) => void;
}

const columnHelper = createColumnHelper<CandidateProfile>();

export function CandidateDataTable({ candidates, onSelectCandidate }: CandidateDataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = [
    columnHelper.accessor("name", {
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold hover:text-amber-500 transition-colors"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CANDIDATE <ArrowUpDown className="h-3 w-3 text-amber-500" />
        </button>
      ),
      cell: (info) => (
        <div>
          <div className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-1.5">
            {info.getValue()}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">{info.row.original.email}</div>
        </div>
      ),
    }),
    columnHelper.accessor("role", {
      header: "ROLE",
      cell: (info) => (
        <span className="inline-block px-3 py-1 rounded-lg bg-purple-500/10 dark:bg-purple-500/15 border border-purple-500/30 text-purple-700 dark:text-purple-300 font-mono text-xs font-semibold whitespace-nowrap">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("experience", {
      header: "EXPERIENCE",
      cell: (info) => (
        <span className="text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1.5 font-mono font-medium whitespace-nowrap">
          <Clock className="h-3.5 w-3.5 text-amber-500" /> {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("currentCompany", {
      header: "COMPANY",
      cell: (info) => (
        <span className="text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1.5 font-medium whitespace-nowrap">
          <Building2 className="h-3.5 w-3.5 text-amber-500" /> {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("evaluationStatus", {
      header: "STATUS",
      cell: (info) => {
        const val = info.getValue();
        const styles =
          val === "Completed"
            ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 font-bold"
            : val === "In Review"
            ? "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30 font-bold"
            : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700";

        return (
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-mono border whitespace-nowrap shadow-sm ${styles}`}>
            <CheckCircle className="h-3 w-3" /> {val}
          </span>
        );
      },
    }),
    columnHelper.display({
      id: "actions",
      header: "",
      cell: (info) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelectCandidate(info.row.original);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold text-xs shadow-md shadow-amber-500/20 hover:shadow-lg hover:shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
        >
          <span>Review Profile</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      ),
    }),
  ];

  const validCandidates = candidates.filter((c) => c.name && c.name.trim().length > 0);

  const table = useReactTable({
    data: validCandidates,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const exportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Name,Role,Company,Status"]
        .concat(candidates.map((c) => `${c.name},${c.role},${c.currentCompany},${c.evaluationStatus}`))
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "candidates_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      {/* Table Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Filter candidates by name, role, email..."
            className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/80 pl-10 pr-4 py-2.5 text-xs font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all shadow-sm"
          />
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold text-xs shadow-md shadow-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
        >
          <FileSpreadsheet className="h-4 w-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Table Container */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/40 overflow-hidden shadow-xl shadow-slate-200/40 dark:shadow-none backdrop-blur-md">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-4 font-bold whitespace-nowrap">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-200/80 dark:divide-slate-800/60">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                onClick={() => onSelectCandidate(row.original)}
                className="hover:bg-amber-500/[0.04] dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
