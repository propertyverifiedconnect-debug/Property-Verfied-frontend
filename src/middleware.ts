import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token_user")?.value;
  
  // Get the current path
  const { pathname } = req.nextUrl;

  // 1. Allow these routes to pass through without authentication
  if (
    pathname.startsWith("/auth") || 
    pathname.startsWith("/_next") ||
    pathname.startsWith("/middleware") || // ✅ Add this to exclude your /middleware page
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // 2. If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  // Matches everything except static files and APIs
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};