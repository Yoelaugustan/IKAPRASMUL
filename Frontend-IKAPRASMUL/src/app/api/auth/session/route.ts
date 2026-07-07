import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ACCESS_COOKIE, REFRESH_COOKIE, authCookieOptions } from "@/lib/auth";

const API_URL = process.env.API_URL ?? "http://localhost:5080";

function isExpired(token: string): boolean {
  try {
    const segment = token.split(".")[1];
    if (!segment) return true;
    const payload = JSON.parse(
      Buffer.from(segment, "base64").toString("utf-8"),
    ) as { exp?: number };
    return !payload.exp || Date.now() / 1000 >= payload.exp - 30;
  } catch {
    return true;
  }
}

// On-demand session check the client calls on every admin route change.
// The server-rendered admin layout's auth gate only runs on an actual
// navigation request — Next reuses the cached layout segment for
// client-side navigations between already-visited admin pages, so a
// session that expired while the tab sat open (e.g. overnight, or a
// browser restoring several admin tabs at once) can otherwise go
// unnoticed until a write fails with no explanation. This mirrors the
// same check/refresh proxy.ts does for full page loads.
export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_COOKIE)?.value;
  const refreshToken = cookieStore.get(REFRESH_COOKIE)?.value;

  if (accessToken && !isExpired(accessToken)) {
    return NextResponse.json({ ok: true });
  }
  if (!refreshToken) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  try {
    const refreshRes = await fetch(`${API_URL}/api/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    });

    if (!refreshRes.ok) {
      const res = NextResponse.json({ ok: false }, { status: 401 });
      res.cookies.set(ACCESS_COOKIE, "", { maxAge: 0, path: "/" });
      res.cookies.set(REFRESH_COOKIE, "", { maxAge: 0, path: "/" });
      return res;
    }

    const data = (await refreshRes.json()) as {
      accessToken: string;
      refreshToken: string;
    };
    const res = NextResponse.json({ ok: true });
    res.cookies.set(ACCESS_COOKIE, data.accessToken, authCookieOptions());
    res.cookies.set(REFRESH_COOKIE, data.refreshToken, authCookieOptions());
    return res;
  } catch {
    // API unreachable — a transient blip shouldn't kick the admin out; the
    // next real request will surface any actual failure.
    return NextResponse.json({ ok: true });
  }
}
