import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  // Auth and subscription checks are handled client-side by the AccessGate
  // component on all /exercises pages. This avoids using @supabase/ssr in
  // middleware which triggers browser restriction warnings in embedded previews.
  return NextResponse.next({ request });
}
