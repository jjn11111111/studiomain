import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    const response = await fetch(`${supabaseUrl}/rest/v1/user_stats?select=total_users&limit=1`, {
      headers: {
        apikey: supabaseKey!,
        Authorization: `Bearer ${supabaseKey}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch user stats")
    }

    const data = await response.json()
    const totalUsers = data[0]?.total_users || 252

    return NextResponse.json({ total_users: totalUsers })
  } catch (error) {
    console.error("Error fetching user stats:", error)
    return NextResponse.json({ total_users: 252 }, { status: 200 })
  }
}
