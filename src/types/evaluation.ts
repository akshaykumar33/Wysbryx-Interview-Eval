export type CategoryState = {
  score: number;
  covered: boolean | null;
  notes: string;
};

export type StateMap = Record<string, CategoryState>;

export interface CategoryGroup {
  title: string;
  icon: string;
  sub: string;
  cats: string[];
}

export interface EvaluationReport {
  overallScore: number;
  hiringDecision: "Strong Hire" | "Hire" | "Lean Hire" | "Lean No Hire" | "No Hire";
  confidence: "High" | "Medium" | "Low";
  summary: string;
  interviewerName?: string;
  interviewDate?: string;
  candidateEmail?: string;
  groupScores: { title: string; score: number }[];
  categories: {
    name: string;
    score: number;
    evidence: string;
    strengths: string;
    suggestions: string;
  }[];
  technicalBreakdown: { area: string; note: string }[];
  softSkills: { area: string; note: string }[];
  risks: string[];
  roadmap: {
    immediate: string[];
    oneMonth: string[];
    threeMonths: string[];
  };
}

export interface SavedRecord {
  id: string;
  candidate: string;
  role: string;
  date: string;
  interviewerName?: string;
  candidateEmail?: string;
  overallScore: number;
  hiringDecision: string;
  categories: StateMap;
  report: EvaluationReport;
}
