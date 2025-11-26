import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Get token from multiple sources
  const cookieHeader = req.headers.get('cookie') || '';
  const tokenFromHeader = cookieHeader
    .split(';')
    .find(c => c.trim().startsWith('token_user='))
    ?.split('=')[1];
    
  const tokenFromCookies = req.cookies.get("token_user")?.value;
  
  // Also check Authorization header as fallback
  const authHeader = req.headers.get('authorization');
  const tokenFromAuth = authHeader?.replace('Bearer ', '');
  
  const token = tokenFromCookies || tokenFromHeader || tokenFromAuth;

  // Debug logs (remove after testing)
  console.log("🔍 Middleware triggered");
  console.log("📍 Path:", pathname);
  console.log("🍪 Cookie header:", cookieHeader);
  console.log("🔑 Token from cookies:", !!tokenFromCookies);
  console.log("🔑 Token from header:", !!tokenFromHeader);
  console.log("✅ Final token exists:", !!token);

  // 1. Public routes - allow access
  const isPublicRoute = 
    pathname.startsWith("/auth") || 
    pathname.startsWith("/_next") ||
    pathname.startsWith("/middleware") ||
    pathname === "/favicon.ico" ||
    pathname === "/";

  if (isPublicRoute) {
    console.log("✅ Public route, allowing access");
    return NextResponse.next();
  }

  // 2. Protected routes - check token
  if (!token) {
    console.log("❌ No token found, redirecting to login");
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Token exists, allow access
  console.log("✅ Token found, allowing access to protected route");
  return NextResponse.next();
}

// CRITICAL: Exclude public routes from matcher entirely
export const config = {
  matcher: [
    /*
     * Match all paths EXCEPT:
     * - /api routes
     * - /auth routes (login, register, etc.)
     * - /_next (Next.js internals)
     * - /middleware page
     * - Static files
     */
    '/((?!api|auth|favicon.ico|middleware).*)',
  ],
};