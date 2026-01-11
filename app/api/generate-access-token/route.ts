import { type NextRequest, NextResponse } from "next/server"

// Generate a simple JWT-like access token
// Format: base64url(email.timestamp.signature)

export async function POST(request: NextRequest) {
  try {
    const { email, stripeCustomerId } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Create token components
    const timestamp = Date.now().toString()
    const secret = process.env.JWT_SECRET || "pineal-vision-secret-key"
    const signature = Buffer.from(`${email}.${timestamp}.${secret}`).toString("base64url")

    // Combine and encode
    const tokenData = `${email}.${timestamp}.${signature}`
    const token = Buffer.from(tokenData).toString("base64url")

    // Generate the magic link
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"
    const magicLink = `${baseUrl}/access/${token}`

    return NextResponse.json({
      token,
      magicLink,
      email,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate token" }, { status: 500 })
  }
}
