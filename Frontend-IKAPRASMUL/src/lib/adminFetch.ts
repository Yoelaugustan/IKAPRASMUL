import "server-only";

import { cookies } from "next/headers";
import { ACCESS_COOKIE, REFRESH_COOKIE, authCookieOptions } from "@/lib/auth";

const API_URL = process.env.API_URL ?? "http://localhost:5080";

// Module-level dedup: if multiple concurrent BFF route handler calls all hit a
// 401 at the same time (e.g. parallel CMS mutations), only one refresh goes to
// the backend. The middleware handles refreshes for server-component page loads,
// so this guard is mainly for client-triggered saves/deletes/uploads.
let pendingRefresh: Promise<{ accessToken: string; refreshToken: string } | null> | null = null;

// Server-only fetch to the .NET admin API. Attaches the access JWT as a Bearer
// token (kept server-side — never exposed to the browser), and on a 401 rotates
// the token pair via the refresh token, rewrites the cookies, and retries once.
//
// Cookie writes succeed in route handlers (BFF proxy); server components have a
// read-only cookie store. The middleware (middleware.ts) handles proactive refresh
// before server-component renders so this fallback is not normally reached there.
export async function adminFetch(path: string, init?: RequestInit): Promise<Response> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_COOKIE)?.value;

  const send = (token: string | undefined) =>
    fetch(`${API_URL}${path}`, {
      ...init,
      headers: {
        ...(init?.headers ?? {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "no-store",
    });

  const res = await send(accessToken);
  if (res.status !== 401) return res;

  const refreshToken = cookieStore.get(REFRESH_COOKIE)?.value;
  if (!refreshToken) return res;

  // Share one refresh call across all concurrent callers.
  if (!pendingRefresh) {
    pendingRefresh = (async () => {
      try {
        const refreshRes = await fetch(`${API_URL}/api/auth/refresh`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
          cache: "no-store",
        });
        if (!refreshRes.ok) return null;
        return (await refreshRes.json()) as { accessToken: string; refreshToken: string };
      } catch {
        return null;
      } finally {
        pendingRefresh = null;
      }
    })();
  }

  const data = await pendingRefresh;
  if (!data) return res;

  try {
    cookieStore.set(ACCESS_COOKIE, data.accessToken, authCookieOptions());
    cookieStore.set(REFRESH_COOKIE, data.refreshToken, authCookieOptions());
  } catch {
    // Read-only in server components — middleware handles that path.
  }

  return send(data.accessToken);
}
