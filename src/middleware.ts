import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token_user")?.value;

  // If no token -> redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

// Apply middleware only on protected routes
export const config = {
  matcher: ["/dashboard/:path*"],
};
