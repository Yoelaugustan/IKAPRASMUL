import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ACCESS_COOKIE, REFRESH_COOKIE, authCookieOptions } from "@/lib/auth";

const API_URL = process.env.API_URL ?? "http://localhost:5080";

// Revokes the refresh token on the backend, then clears both auth cookies.
export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_COOKIE)?.value;

  if (refreshToken) {
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
        cache: "no-store",
      });
    } catch {
      // Best effort — clear cookies regardless so the browser session ends.
    }
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ACCESS_COOKIE, "", authCookieOptions(0));
  res.cookies.set(REFRESH_COOKIE, "", authCookieOptions(0));
  return res;
}
