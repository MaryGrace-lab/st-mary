// proxy.ts – Production‑ready: authentication + security headers
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ── Helper: apply security headers ──
function applySecurityHeaders(response: NextResponse) {
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()"
  );

  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload"
    );
  }

  response.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self'",
      "connect-src 'self' https:",
      "frame-ancestors 'none'",
    ].join("; ")
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── 1. Allow login page and its query params (e.g., ?callbackUrl=...) ──
  if (pathname === "/admin/login" || pathname.startsWith("/admin/login?")) {
    const res = NextResponse.next();
    applySecurityHeaders(res);
    return res;
  }

  // ── 2. Protect all other /admin routes ──
  if (pathname.startsWith("/admin")) {
    const session = await auth();   // ← returns Session | null

    if (!session || session.user?.role !== "admin") {
      // Not authenticated → redirect to login with callbackUrl
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("callbackUrl", request.url);
      const res = NextResponse.redirect(loginUrl);
      applySecurityHeaders(res);
      return res;
    }

    // Authenticated and admin → allow request
    const res = NextResponse.next();
    applySecurityHeaders(res);
    return res;
  }

  // ── 3. All other routes (public) → just add security headers ──
  const res = NextResponse.next();
  applySecurityHeaders(res);
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};