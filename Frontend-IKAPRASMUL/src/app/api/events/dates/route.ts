import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL ?? "http://localhost:5080";

export async function GET(req: NextRequest) {
  const month = req.nextUrl.searchParams.get("month") ?? "";
  try {
    const res = await fetch(`${API_URL}/api/events/dates?month=${encodeURIComponent(month)}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return NextResponse.json([], { status: res.status });
    const data = await res.json() as string[];
    return NextResponse.json(data);
  } catch {
    return NextResponse.json([]);
  }
}
