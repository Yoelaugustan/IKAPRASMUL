import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { adminFetch } from "@/lib/adminFetch";

// Maps the first admin path segment to a public cache tag.
const CACHE_TAG: Record<string, string> = {
  stories: "stories",
  news: "news",
  business: "business",
  sig: "sig",
  events: "events",
};

// Single choke point for all admin writes/reads. Forwards to the .NET
// `/api/admin/*` endpoints through adminFetch, which attaches the access token
// (kept server-side) and transparently refreshes on 401. Keeping tokens out of
// the browser satisfies security-standard §7.1.
async function forward(request: NextRequest, segments: string[]): Promise<NextResponse> {
  const target = `/api/admin/${segments.map(encodeURIComponent).join("/")}${request.nextUrl.search}`;
  const method = request.method;

  const init: RequestInit = { method };
  if (method !== "GET" && method !== "HEAD") {
    const contentType = request.headers.get("content-type");
    // Forward the raw bytes so both JSON and multipart (uploads) pass through.
    init.body = await request.arrayBuffer();
    if (contentType) init.headers = { "Content-Type": contentType };
  }

  let res: Response;
  try {
    res = await adminFetch(target, init);
  } catch {
    return NextResponse.json({ error: "Unable to reach the server." }, { status: 502 });
  }

  // On successful mutation, punch through the public page cache immediately.
  if (res.ok && (method === "POST" || method === "DELETE")) {
    const tag = CACHE_TAG[segments[0]];
    if (tag) revalidateTag(tag, {});
  }

  if (res.status === 204) {
    return new NextResponse(null, { status: 204 });
  }

  const body = await res.arrayBuffer();
  return new NextResponse(body, {
    status: res.status,
    headers: { "content-type": res.headers.get("content-type") ?? "application/json" },
  });
}

type Ctx = { params: Promise<{ path: string[] }> };

export async function GET(request: NextRequest, { params }: Ctx) {
  return forward(request, (await params).path);
}

export async function POST(request: NextRequest, { params }: Ctx) {
  return forward(request, (await params).path);
}

export async function PATCH(request: NextRequest, { params }: Ctx) {
  return forward(request, (await params).path);
}

export async function DELETE(request: NextRequest, { params }: Ctx) {
  return forward(request, (await params).path);
}
