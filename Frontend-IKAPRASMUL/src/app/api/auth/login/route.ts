import { NextResponse } from "next/server";
import { adminLoginSchema } from "@/types/schemas";
import { ACCESS_COOKIE, REFRESH_COOKIE, authCookieOptions } from "@/lib/auth";

const API_URL = process.env.API_URL ?? "http://localhost:5080";

// Proxies admin login to the .NET backend and stores the returned JWTs in
// httpOnly cookies. The browser never sees the tokens directly (security-standard §7.1).
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = adminLoginSchema.safeParse(body);
  if (!parsed.success) {
    // Generic message — never reveal which field failed (enumeration defense).
    return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
  }

  let backendRes: Response;
  try {
    backendRes = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: parsed.data.email, password: parsed.data.password }),
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to reach the server. Please try again later." },
      { status: 502 },
    );
  }

  if (!backendRes.ok) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const data = (await backendRes.json()) as {
    accessToken: string;
    refreshToken: string;
  };

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ACCESS_COOKIE, data.accessToken, authCookieOptions());
  res.cookies.set(REFRESH_COOKIE, data.refreshToken, authCookieOptions());
  return res;
}
