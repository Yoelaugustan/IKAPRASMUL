import { NextResponse, type NextRequest } from "next/server";

// Next.js 16 edge/middleware logic lives in `proxy.ts` (renamed from
// middleware.ts). Coarse-grained gate for /admin: if there's no session cookie,
// bounce to the admin login. Fine-grained role checks happen server-side in
// admin/layout.tsx (deny-by-default, security-standard §3).
const SESSION_COOKIE = "ikap_session";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = request.cookies.has(SESSION_COOKIE);

  if (pathname.startsWith("/admin") && !hasSession) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Already signed in → keep admins out of the login page.
  if (pathname === "/login" && hasSession) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
