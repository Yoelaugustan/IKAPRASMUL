import { type NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL ?? "http://localhost:5080";

// Public BFF — no auth required. Proxies view-count increments from the browser
// to the backend so the backend URL never leaks to the client.
export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
): Promise<NextResponse> {
  const { slug } = await params;
  try {
    await fetch(`${API_URL}/api/news/${encodeURIComponent(slug)}/view`, {
      method: "POST",
    });
  } catch {
    // Silently ignore — a failed view count must never break the article page.
  }
  return new NextResponse(null, { status: 204 });
}
