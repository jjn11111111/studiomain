import { type NextRequest, NextResponse } from "next/server"

// Simple JWT-like token validation
// Format: email.timestamp.signature
// In production, use proper JWT library like 'jsonwebtoken'

function validateToken(token: string): { valid: boolean; email?: string; error?: string } {
  try {
    // Decode the token (base64url encoded)
    const decoded = Buffer.from(token, "base64url").toString("utf-8")
    const [email, timestamp, signature] = decoded.split(".")

    // Check if all parts exist
    if (!email || !timestamp || !signature) {
      return { valid: false, error: "Invalid token format" }
    }

    // Verify signature (simple HMAC with secret)
    const secret = process.env.JWT_SECRET || "pineal-vision-secret-key"
    const expectedSignature = Buffer.from(`${email}.${timestamp}.${secret}`).toString("base64url")

    if (signature !== expectedSignature) {
      return { valid: false, error: "Invalid token signature" }
    }

    // Check if token is expired (30 days validity)
    const tokenTime = Number.parseInt(timestamp)
    const now = Date.now()
    const thirtyDays = 30 * 24 * 60 * 60 * 1000

    if (now - tokenTime > thirtyDays) {
      return { valid: false, error: "Token expired" }
    }

    return { valid: true, email }
  } catch (error) {
    return { valid: false, error: "Failed to validate token" }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ valid: false, error: "No token provided" }, { status: 400 })
    }

    const result = validateToken(token)

    if (result.valid) {
      return NextResponse.json({ valid: true, email: result.email })
    } else {
      return NextResponse.json({ valid: false, error: result.error }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ valid: false, error: "Server error" }, { status: 500 })
  }
}
