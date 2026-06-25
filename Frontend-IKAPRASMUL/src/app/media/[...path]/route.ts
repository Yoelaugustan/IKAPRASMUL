import { type NextRequest, NextResponse } from "next/server";

const API = process.env.API_URL ?? "http://localhost:5080";

type Ctx = { params: Promise<{ path: string[] }> };

export async function GET(_req: NextRequest, { params }: Ctx) {
  const { path } = await params;
  const upstream = `${API}/media/${path.join("/")}`;

  let res: Response;
  try {
    res = await fetch(upstream, { cache: "force-cache" });
  } catch {
    return new NextResponse(null, { status: 502 });
  }

  if (!res.ok) {
    return new NextResponse(null, { status: res.status });
  }

  return new NextResponse(res.body, {
    headers: {
      "content-type": res.headers.get("content-type") ?? "application/octet-stream",
      "cache-control": res.headers.get("cache-control") ?? "public, max-age=31536000, immutable",
    },
  });
}
