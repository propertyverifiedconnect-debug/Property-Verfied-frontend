import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token_user")?.value;
  
  // Get the current path
  const { pathname } = req.nextUrl;

  // 1. Allow requests to the login page or public assets to pass through
  // This prevents the infinite loop
  if (pathname.startsWith("/auth") || pathname.startsWith("/_next")) {
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