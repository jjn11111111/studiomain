import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function GET() {
  try {
    console.log("[v0] user-stats API called")
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    console.log("[v0] Supabase URL:", supabaseUrl)
    console.log("[v0] Has Supabase key:", !!supabaseKey)

    if (!supabaseUrl || !supabaseKey) {
      console.log("[v0] Missing Supabase credentials, returning default")
      return NextResponse.json({ total_users: 252 }, { status: 200 })
    }

    const fetchUrl = `${supabaseUrl}/rest/v1/user_stats?select=total_users&limit=1`
    console.log("[v0] Fetching from:", fetchUrl)

    const response = await fetch(fetchUrl, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    })

    console.log("[v0] Supabase response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.log("[v0] Supabase error:", errorText)
      return NextResponse.json({ total_users: 252 }, { status: 200 })
    }

    const data = await response.json()
    console.log("[v0] Supabase data:", data)
    const totalUsers = data[0]?.total_users || 252

    return NextResponse.json({ total_users: totalUsers })
  } catch (error) {
    console.error("[v0] Error in user-stats API:", error)
    return NextResponse.json({ total_users: 252 }, { status: 200 })
  }
}
