import { cookies } from "next/headers";

// Session helpers (server-side). The JWTs are delivered to the browser only via
// httpOnly cookies set by the BFF route handlers (app/api/auth/*); the browser
// never reads them directly (security-standard §2.4/§7.1).
//
// Two cookies: a 1-hour access JWT (lifetime enforced by the API) and a 7-day
// refresh token. The COOKIE lifetime is decoupled from the JWT's internal expiry
// — the access cookie persists for the refresh window and is rewritten by the BFF
// proxy whenever the API returns 401 (see lib/adminFetch.ts). Once the refresh
// token is gone too, admin calls 401 and the app redirects to /login.
export const ACCESS_COOKIE = "ikap_at";
export const REFRESH_COOKIE = "ikap_rt";

const COOKIE_MAX_AGE = 60 * 60 * 24; // 1 day, matching the refresh token

export type AdminSession = {
  email: string;
  role: "Admin" | "SuperAdmin";
  permissions: string[];
};

export function authCookieOptions(maxAge: number = COOKIE_MAX_AGE) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

/** Decodes a JWT payload without verifying the signature (the API verifies it on
 * every call). Used only to surface the admin's email/role for display + the gate. */
function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const segment = token.split(".")[1];
    if (!segment) return null;
    const normalized = segment.replace(/-/g, "+").replace(/_/g, "/");
    const json = Buffer.from(normalized, "base64").toString("utf-8");
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export async function getAdminSession(): Promise<AdminSession | null> {
  // Next.js 16: cookies() is async — always await it.
  const cookieStore = await cookies();
  const token = cookieStore.get(ACCESS_COOKIE)?.value;
  if (!token) return null;

  const payload = decodeJwtPayload(token);
  const email = payload && typeof payload.email === "string" ? payload.email : undefined;
  if (!email) return null;

  // Read role from JWT; backend enforces this on every request.
  const rawRole = payload?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    ?? payload?.role;
  const role: "Admin" | "SuperAdmin" =
    rawRole === "SuperAdmin" ? "SuperAdmin" : "Admin";

  // Normal admins carry a comma-separated `perms` claim; SuperAdmins don't
  // (they bypass all section checks server-side).
  const rawPerms = typeof payload?.perms === "string" ? payload.perms : "";
  const permissions = role === "SuperAdmin"
    ? []
    : rawPerms.split(",").map((s) => s.trim()).filter(Boolean);

  return { email, role, permissions };
}
