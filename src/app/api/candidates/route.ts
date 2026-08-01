import { NextResponse } from "next/server";
import { getAllCandidatesFromDb, upsertCandidateInDb, deleteCandidateFromDb } from "@/lib/db";

export async function GET() {
  try {
    const candidates = getAllCandidatesFromDb();
    return NextResponse.json({ candidates });
  } catch (error) {
    console.error("GET /api/candidates error:", error);
    return NextResponse.json({ error: "Failed to fetch candidates" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body || !body.name || !body.id) {
      return NextResponse.json({ error: "Invalid candidate profile data" }, { status: 400 });
    }
    const saved = upsertCandidateInDb(body);
    return NextResponse.json({ candidate: saved });
  } catch (error) {
    console.error("POST /api/candidates error:", error);
    return NextResponse.json({ error: "Failed to save candidate" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing candidate ID" }, { status: 400 });
    }
    deleteCandidateFromDb(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/candidates error:", error);
    return NextResponse.json({ error: "Failed to delete candidate" }, { status: 500 });
  }
}
