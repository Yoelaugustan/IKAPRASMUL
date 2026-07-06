import { NextResponse } from "next/server";

const API_URL = process.env.API_URL ?? "http://localhost:5080";

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/api/governance-documents`, {
      next: { revalidate: 300, tags: ["governance-documents"] },
    });
    if (!res.ok) return NextResponse.json([], { status: res.status });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json([]);
  }
}
