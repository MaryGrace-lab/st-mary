// proxy.ts
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkRateLimit } from "@/lib/rateLimit";

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

  // Updated Content Security Policy
  response.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self'",
      "connect-src 'self' https:",
      "media-src 'self' https://*.public.blob.vercel-storage.com",  // ← added
      "frame-ancestors 'none'",
    ].join("; ")
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rate limit login endpoints
  if (
    (pathname === "/api/auth/callback/credentials" ||
      pathname === "/api/auth/signin") &&
    request.method === "POST"
  ) {
    const ip = request.headers.get("x-forwarded-for") ?? "anonymous";
    const { success, remaining } = await checkRateLimit(ip, {
      endpoint: "login",
      limit: 5,
      windowSeconds: 15 * 60,
    });

    if (!success) {
      return NextResponse.json(
        { error: "Too many login attempts. Please try again later." },
        { status: 429, headers: { "Retry-After": "900" } }
      );
    }
  }

  // Allow login page
  if (pathname === "/admin/login" || pathname.startsWith("/admin/login?")) {
    const res = NextResponse.next();
    applySecurityHeaders(res);
    return res;
  }

  // Protect other admin routes
  if (pathname.startsWith("/admin")) {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("callbackUrl", request.url);
      const res = NextResponse.redirect(loginUrl);
      applySecurityHeaders(res);
      return res;
    }
    const res = NextResponse.next();
    applySecurityHeaders(res);
    return res;
  }

  // All other routes: just add security headers
  const res = NextResponse.next();
  applySecurityHeaders(res);
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};