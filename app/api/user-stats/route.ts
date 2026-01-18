import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ total_users: 252 })
    }

    const response = await fetch(`${supabaseUrl}/rest/v1/user_stats?select=total_users&limit=1`, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    })

    if (!response.ok) {
      return NextResponse.json({ total_users: 252 })
    }

    const data = await response.json()
    return NextResponse.json({ total_users: data[0]?.total_users || 252 })
  } catch {
    return NextResponse.json({ total_users: 252 })
  }
}
