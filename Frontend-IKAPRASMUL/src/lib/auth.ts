import { cookies } from "next/headers";

// Session helpers (server-side). The auth cookie is httpOnly and set by the BFF
// route handler (app/api/auth/*). The browser never reads the token directly.
//
// NOTE (static phase): there is no real backend yet, so the session is a dummy
// opaque token. When the .NET API is wired, validate/refresh the token here and
// derive the real role. Keep the signature stable.
export const SESSION_COOKIE = "ikap_session";

export type AdminSession = {
  email: string;
  role: "Admin";
};

export async function getAdminSession(): Promise<AdminSession | null> {
  // Next.js 16: cookies() is async — always await it.
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  // Dummy decode. Replace with real JWT validation against the .NET backend.
  try {
    const decoded = JSON.parse(
      Buffer.from(token, "base64").toString("utf-8"),
    ) as { email?: string };
    if (!decoded.email) return null;
    return { email: decoded.email, role: "Admin" };
  } catch {
    return null;
  }
}
