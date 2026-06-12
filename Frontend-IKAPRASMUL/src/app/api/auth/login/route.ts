import { NextResponse } from "next/server";
import { adminLoginSchema } from "@/types/schemas";
import { SESSION_COOKIE } from "@/lib/auth";

// BFF login. In production this forwards credentials to the .NET backend,
// receives the JWT, and sets it as an httpOnly Secure cookie (security-standard
// §2.3/§7.1).
//
// STATIC PHASE: there is no backend, so this accepts any schema-valid login and
// issues a dummy opaque session cookie. DO NOT ship to production as-is.
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

  // Dummy token. Replace with the JWT returned by the .NET backend.
  const token = Buffer.from(
    JSON.stringify({ email: parsed.data.email }),
  ).toString("base64");

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: parsed.data.remember ? 60 * 60 * 24 * 7 : 60 * 60 * 8,
  });
  return res;
}
