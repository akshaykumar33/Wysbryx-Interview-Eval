import { StateMap, EvaluationReport } from "./evaluation";

export interface CandidateProfile {
  id: string;
  name: string;
  role: string;
  experience: string;
  email: string;
  phone: string;
  location: string;
  currentCompany: string;
  skills: string[];
  github?: string;
  linkedIn?: string;
  portfolio?: string;
  resumeUrl?: string;
  evaluationStatus: "Pending" | "In Review" | "Completed";
  interviewerName?: string;
  interviewDate?: string;
  state: StateMap;
  report?: EvaluationReport;
  reportDate?: string;
}

export interface MetricKPI {
  label: string;
  value: string | number;
  change: string;
  trend: "up" | "down" | "neutral";
  description: string;
}
