import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ACCESS_COOKIE, REFRESH_COOKIE, authCookieOptions } from "@/lib/auth";

const API_URL = process.env.API_URL ?? "http://localhost:5080";

// Rotates the token pair. Called by the admin client when an API request 401s.
// On failure the cookies are cleared so the user is bounced to sign-in.
export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_COOKIE)?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: "No session" }, { status: 401 });
  }

  let backendRes: Response;
  try {
    backendRes = await fetch(`${API_URL}/api/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    });
  } catch {
    return NextResponse.json({ error: "Unable to reach the server." }, { status: 502 });
  }

  if (!backendRes.ok) {
    const res = NextResponse.json({ error: "Session expired" }, { status: 401 });
    res.cookies.set(ACCESS_COOKIE, "", authCookieOptions(0));
    res.cookies.set(REFRESH_COOKIE, "", authCookieOptions(0));
    return res;
  }

  const data = (await backendRes.json()) as { accessToken: string; refreshToken: string };
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ACCESS_COOKIE, data.accessToken, authCookieOptions());
  res.cookies.set(REFRESH_COOKIE, data.refreshToken, authCookieOptions());
  return res;
}
