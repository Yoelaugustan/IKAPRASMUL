import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";

// Clears the session cookie. In production also revoke the refresh token on the
// .NET backend (security-standard §2.4).
export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
