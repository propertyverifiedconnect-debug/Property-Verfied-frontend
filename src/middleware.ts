import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // ✅ Read ONLY the client-side cookies (for middleware)
  const clientTokenUser = req.cookies.get("client_token_user")?.value;
  const clientTokenAdmin = req.cookies.get("client_token_admin")?.value;
  const clientTokenPartner = req.cookies.get("client_token_partner")?.value;
  
  const hasToken = clientTokenUser || clientTokenAdmin || clientTokenPartner;

  // Debug logs
  console.log("🔍 Middleware Check:", {
    path: pathname,
    hasClientTokenUser: !!clientTokenUser,
    hasClientTokenAdmin: !!clientTokenAdmin,
    hasClientTokenPartner: !!clientTokenPartner,
    result: !!hasToken
  });

  // Public routes
  const isPublicRoute = 
    pathname.startsWith("/auth") || 
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname === "/";

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Protected routes
  if (!hasToken) {
    console.log("❌ No client token found, redirecting to login");
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ✅ Token exists, allow access
  console.log("✅ Client token found, allowing access");
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};