import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import { CandidateProfile } from "@/types/candidate";
import { EvaluationReport, SavedRecord, StateMap } from "@/types/evaluation";
import { ALL_CATS } from "@/utils/constants";
import { generateEvaluationReport } from "@/utils/engine";

// ─── Initial Seed Data ────────────────────────────────────────

const AYUSH_EVALUATION_DATA: StateMap = {
  "Product Thinking": { score: 4, covered: false, notes: "Missed. Limited product-thinking approach." },
  "Requirement Analysis": { score: 4, covered: false, notes: "Missed. Requirement gathering was not structured enough." },
  "Clarification Questions": { score: 6, covered: true, notes: "Average. Asked some questions." },
  "MVP Thinking": { score: 4, covered: false, notes: "Missed. Focused more on implementation." },
  "System Design": { score: 5, covered: true, notes: "Needs Improvement." },
  HLD: { score: 5, covered: true, notes: "Needs Improvement." },
  LLD: { score: 5, covered: true, notes: "Needs Improvement." },
  "Database Design": { score: 6, covered: true, notes: "Average. Database design was acceptable." },
  "API Design": { score: 4, covered: true, notes: "Weak. API design fundamentals need improvement." },
  "Design Patterns": { score: 3, covered: true, notes: "Weak. Limited understanding." },
  RBAC: { score: 5, covered: true, notes: "Partially Implemented." },
  "Multi Tenancy": { score: 3, covered: false, notes: "Weak. Multi-tenant architecture concepts missing." },
  Security: { score: 3, covered: false, notes: "Weak. Security aspects missing." },
  Scalability: { score: 4, covered: false, notes: "Weak. Scalability strategies missing." },
  Performance: { score: 7, covered: true, notes: "Good. Code structuring & performance optimization." },
  "AI Usage": { score: 7, covered: true, notes: "Good but Limited. Uses AI tools like ChatGPT." },
  "Prompt Engineering": { score: 8, covered: true, notes: "Strong. Capable of writing effective single-shot prompts." },
  "Debugging Ability": { score: 8, covered: true, notes: "Good. Demonstrates strong debugging skills." },
  Communication: { score: 8, covered: true, notes: "Good. Collaborative working style." },
  "Tradeoff Analysis": { score: 5, covered: true, notes: "Needs Improvement." },
  Leadership: { score: 8, covered: true, notes: "Good Potential. Demonstrates leadership qualities." },
  Ownership: { score: 8, covered: true, notes: "Good. Openly accepts mistakes." },
  "Learning Mindset": { score: 9, covered: true, notes: "Strong. Positive learning attitude." },
};

let cachedAyushReport: EvaluationReport | null = null;
function getAyushReport(): EvaluationReport {
  if (!cachedAyushReport) {
    cachedAyushReport = generateEvaluationReport("Ayush Jaiswal", "Full Stack Engineer", AYUSH_EVALUATION_DATA);
  }
  return cachedAyushReport;
}

const AYUSH_PROFILE: CandidateProfile = {
  id: "cand-ayush",
  name: "Ayush Jaiswal",
  role: "Full Stack Engineer",
  experience: "5+ Years",
  email: "ayush60000@gmail.com",
  phone: "+91 98765 43210",
  location: "India",
  currentCompany: "Tech Corp",
  skills: ["React", "Node.js", "AI Prompts", "Debugging", "Communication"],
  evaluationStatus: "Completed",
  interviewerName: "Technical Hiring Manager",
  interviewDate: new Date().toISOString().split("T")[0],
  state: AYUSH_EVALUATION_DATA,
  report: {
    ...getAyushReport(),
    interviewerName: "Technical Hiring Manager",
    interviewDate: new Date().toISOString().split("T")[0],
    candidateEmail: "ayush60000@gmail.com",
  },
};

// ─── Global Singleton SQLite DB Connection ────────────────────

const globalForDb = globalThis as unknown as { sqliteDb: Database.Database | undefined };

function getDbPath(): string {
  if (process.env.VERCEL) {
    return path.join("/tmp", "eval.sqlite");
  }
  const dir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return path.join(dir, "eval.sqlite");
}

function getDb(): Database.Database {
  if (globalForDb.sqliteDb) return globalForDb.sqliteDb;

  const dbPath = getDbPath();
  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");

  // Create Candidate Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS candidates (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      experience TEXT,
      email TEXT,
      phone TEXT,
      location TEXT,
      currentCompany TEXT,
      skills TEXT,
      evaluationStatus TEXT,
      interviewerName TEXT,
      interviewDate TEXT,
      state TEXT,
      report TEXT,
      updatedAt TEXT
    );
  `);

  // Create Evaluation Records Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS evaluations (
      id TEXT PRIMARY KEY,
      candidateId TEXT,
      candidateName TEXT,
      role TEXT,
      interviewerName TEXT,
      interviewDate TEXT,
      overallScore INTEGER,
      hiringDecision TEXT,
      categories TEXT,
      report TEXT,
      createdAt TEXT
    );
  `);

  // Seed default Ayush profile if table is empty
  const countRow = db.prepare("SELECT COUNT(*) as count FROM candidates").get() as { count: number };
  if (countRow.count === 0) {
    upsertCandidateInDb(AYUSH_PROFILE);
  }

  globalForDb.sqliteDb = db;
  return db;
}

// ─── DB Operations ────────────────────────────────────────────

export function getAllCandidatesFromDb(): CandidateProfile[] {
  const db = getDb();
  const rows = db.prepare("SELECT * FROM candidates ORDER BY updatedAt DESC").all() as Record<string, string>[];

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    role: row.role,
    experience: row.experience || "",
    email: row.email || "",
    phone: row.phone || "",
    location: row.location || "",
    currentCompany: row.currentCompany || "",
    skills: row.skills ? JSON.parse(row.skills) : [],
    evaluationStatus: (row.evaluationStatus as CandidateProfile["evaluationStatus"]) || "Pending",
    interviewerName: row.interviewerName || "",
    interviewDate: row.interviewDate || "",
    state: row.state ? JSON.parse(row.state) : {},
    report: row.report ? JSON.parse(row.report) : undefined,
  }));
}

export function upsertCandidateInDb(candidate: CandidateProfile): CandidateProfile {
  const db = getDb();
  const now = new Date().toISOString();

  const stmt = db.prepare(`
    INSERT INTO candidates (
      id, name, role, experience, email, phone, location, currentCompany, skills,
      evaluationStatus, interviewerName, interviewDate, state, report, updatedAt
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    )
    ON CONFLICT(id) DO UPDATE SET
      name = excluded.name,
      role = excluded.role,
      experience = excluded.experience,
      email = excluded.email,
      phone = excluded.phone,
      location = excluded.location,
      currentCompany = excluded.currentCompany,
      skills = excluded.skills,
      evaluationStatus = excluded.evaluationStatus,
      interviewerName = excluded.interviewerName,
      interviewDate = excluded.interviewDate,
      state = excluded.state,
      report = excluded.report,
      updatedAt = excluded.updatedAt;
  `);

  stmt.run(
    candidate.id,
    candidate.name,
    candidate.role,
    candidate.experience || "",
    candidate.email || "",
    candidate.phone || "",
    candidate.location || "",
    candidate.currentCompany || "",
    JSON.stringify(candidate.skills || []),
    candidate.evaluationStatus || "Pending",
    candidate.interviewerName || "",
    candidate.interviewDate || "",
    JSON.stringify(candidate.state || {}),
    candidate.report ? JSON.stringify(candidate.report) : null,
    now
  );

  return candidate;
}

export function deleteCandidateFromDb(id: string): void {
  const db = getDb();
  db.prepare("DELETE FROM candidates WHERE id = ?").run(id);
}

export function getAllEvaluationsFromDb(): SavedRecord[] {
  const db = getDb();
  const rows = db.prepare("SELECT * FROM evaluations ORDER BY createdAt DESC").all() as Record<string, string | number>[];

  return rows.map((row) => ({
    id: String(row.id),
    candidate: String(row.candidateName || ""),
    role: String(row.role || ""),
    date: String(row.interviewDate || row.createdAt || ""),
    interviewerName: String(row.interviewerName || ""),
    candidateEmail: "",
    overallScore: Number(row.overallScore || 0),
    hiringDecision: String(row.hiringDecision || ""),
    categories: row.categories ? JSON.parse(String(row.categories)) : {},
    report: row.report ? JSON.parse(String(row.report)) : null,
  }));
}

export function upsertEvaluationInDb(record: SavedRecord): SavedRecord {
  const db = getDb();
  const now = new Date().toISOString();

  const stmt = db.prepare(`
    INSERT INTO evaluations (
      id, candidateId, candidateName, role, interviewerName, interviewDate,
      overallScore, hiringDecision, categories, report, createdAt
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    )
    ON CONFLICT(id) DO UPDATE SET
      candidateName = excluded.candidateName,
      role = excluded.role,
      interviewerName = excluded.interviewerName,
      interviewDate = excluded.interviewDate,
      overallScore = excluded.overallScore,
      hiringDecision = excluded.hiringDecision,
      categories = excluded.categories,
      report = excluded.report;
  `);

  stmt.run(
    record.id,
    record.id,
    record.candidate,
    record.role,
    record.interviewerName || "",
    record.date || "",
    record.overallScore || 0,
    record.hiringDecision || "",
    JSON.stringify(record.categories || {}),
    JSON.stringify(record.report || {}),
    now
  );

  return record;
}
