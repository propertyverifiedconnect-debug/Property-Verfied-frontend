import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Prevent caching - important for Vercel
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token_user")?.value;

    // Debug logging (check Vercel function logs)
    console.log("All cookies:", cookieStore.getAll());
    console.log("token_user:", token ? "exists" : "not found");

    return NextResponse.json(
      { valid: !!token },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error("Cookie API Error:", error);
    
    return NextResponse.json(
      { 
        valid: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    );
  }
}