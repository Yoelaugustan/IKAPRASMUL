import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";

// production: also call the .NET backend to revoke the refresh token
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
