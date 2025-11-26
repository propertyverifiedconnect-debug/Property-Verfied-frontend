import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  console.log("🔵 Incoming Request:", pathname);

  // Read client-side cookie
  const clientTokenUser = req.cookies.get("client_token_user")?.value;

  console.log("🔍 Cookies in middleware:", {
    clientTokenUserExists: !!clientTokenUser,
    tokenValue: clientTokenUser || "❌ No token"
  });

  // -------------------------------
  // PUBLIC ROUTES
  // -------------------------------
  const PUBLIC_ROUTES = [
    "/",           // home page
    "/favicon.ico",
  ];

  const isPublic = 
    PUBLIC_ROUTES.includes(pathname) ||
    pathname.startsWith("/auth") ||     // allow /auth and /auth/login
    pathname.startsWith("/_next") ||    // nextjs internals
    pathname.startsWith("/api") ||      // allow all API routes
    pathname.startsWith("/static");     // optional

  console.log("📌 Route check:", {
    pathname,
    isPublic,
  });

  if (isPublic) {
    console.log("🟢 PUBLIC → allowed");
    return NextResponse.next();
  }

  // -------------------------------
  // PROTECTED ROUTES
  // -------------------------------
  if (!clientTokenUser) {
    console.log("❌ NO TOKEN → redirecting to /auth/login");

    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);

    return NextResponse.redirect(loginUrl);
  }

  console.log("🟩 TOKEN FOUND → access granted");
  return NextResponse.next();
}

// ✅ Run middleware for all routes except static assets
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(png|jpg|jpeg|gif|svg)).*)",
  ],
};
