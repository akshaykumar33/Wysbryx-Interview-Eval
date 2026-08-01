import { NextResponse } from "next/server";
import { getAllEvaluationsFromDb, upsertEvaluationInDb } from "@/lib/db";

export async function GET() {
  try {
    const evaluations = getAllEvaluationsFromDb();
    return NextResponse.json({ evaluations });
  } catch (error) {
    console.error("GET /api/evaluations error:", error);
    return NextResponse.json({ error: "Failed to fetch evaluations" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body || !body.id || !body.candidate) {
      return NextResponse.json({ error: "Invalid evaluation record data" }, { status: 400 });
    }
    const saved = upsertEvaluationInDb(body);
    return NextResponse.json({ evaluation: saved });
  } catch (error) {
    console.error("POST /api/evaluations error:", error);
    return NextResponse.json({ error: "Failed to save evaluation" }, { status: 500 });
  }
}
