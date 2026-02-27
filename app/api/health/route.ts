import { NextResponse } from "next/server"

/** Simple health check: if this returns 200, API routes are deployed. */
export async function GET() {
  return NextResponse.json({ ok: true, route: "api/health" })
}
