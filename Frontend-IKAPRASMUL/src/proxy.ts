import { NextResponse, type NextRequest } from "next/server";

// Next.js 16 edge/proxy logic (renamed from middleware.ts).
// Two responsibilities:
//   1. Proactively refresh the JWT pair before any server component renders,
//      so cookies().set() works (it fails silently inside server components).
//   2. Coarse session gate: no cookies at all → /login; on /login with a valid
//      session → /admin. Fine-grained role checks remain in admin/layout.tsx.
//
// Runs in Edge Runtime — use atob(), not Buffer, for base64 decoding.
// Must NOT import from lib/auth (uses next/headers, unavailable here).

const API_URL = process.env.API_URL ?? "http://localhost:5080";
const ACCESS_COOKIE = "ikap_at";
const REFRESH_COOKIE = "ikap_rt";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days, matching the refresh token

function isExpired(token: string): boolean {
  try {
    const segment = token.split(".")[1];
    if (!segment) return true;
    const normalized = segment.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(normalized)) as { exp?: number };
    // Treat as expired 30 s early to avoid a race at the expiry boundary.
    return !payload.exp || Date.now() / 1000 >= payload.exp - 30;
  } catch {
    return true;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get(ACCESS_COOKIE)?.value;
  const refreshToken = request.cookies.get(REFRESH_COOKIE)?.value;

  // --- /login gate: already signed in → skip login page ---
  if (pathname === "/login") {
    if (accessToken && !isExpired(accessToken)) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  // --- /admin gate ---

  // No cookies at all → bounce to login immediately.
  if (!accessToken && !refreshToken) {
    const url = new URL("/login", request.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  // Access token valid → proceed (fast path, no network call).
  if (accessToken && !isExpired(accessToken)) {
    return NextResponse.next();
  }

  // Access token missing or expired — try refresh.
  if (!refreshToken) {
    const url = new URL("/login", request.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  try {
    const refreshRes = await fetch(`${API_URL}/api/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!refreshRes.ok) {
      // Refresh token revoked or expired — clear stale cookies, go to login.
      const url = new URL("/login", request.url);
      url.searchParams.set("from", pathname);
      const res = NextResponse.redirect(url);
      res.cookies.set(ACCESS_COOKIE, "", { maxAge: 0, path: "/" });
      res.cookies.set(REFRESH_COOKIE, "", { maxAge: 0, path: "/" });
      return res;
    }

    const data = (await refreshRes.json()) as {
      accessToken: string;
      refreshToken: string;
    };

    // Redirect to the same URL with the new cookies. This causes a second
    // request where the fresh token is present in request.cookies, so server
    // components can read it via cookies(). Without the redirect, server
    // components still see the expired token from the original request.
    const cookieOpts = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    };
    const res = NextResponse.redirect(request.url);
    res.cookies.set(ACCESS_COOKIE, data.accessToken, cookieOpts);
    res.cookies.set(REFRESH_COOKIE, data.refreshToken, cookieOpts);
    return res;
  } catch {
    // API unreachable (network error) — let the request proceed and let
    // adminFetch surface the 401 naturally rather than looping on a redirect.
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/login"],
};
