import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "nodejs"; 
export const dynamic = "force-dynamic";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token_user")?.value;

  return NextResponse.json(
    { valid: !!token },
    { status: 200, headers: { "Cache-Control": "no-store" } }
  );
}
