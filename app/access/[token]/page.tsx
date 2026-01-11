"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AccessTokenPage() {
  const params = useParams()
  const router = useRouter()
  const [status, setStatus] = useState<"validating" | "success" | "error">("validating")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const validateToken = async () => {
      const token = params.token as string

      try {
        const response = await fetch("/api/validate-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        })

        const data = await response.json()

        if (data.valid) {
          // Store the token in localStorage
          localStorage.setItem("pineal_access_token", token)
          localStorage.setItem("pineal_access_email", data.email)
          setStatus("success")
          setMessage("Access granted! Redirecting to training modules...")

          // Redirect after 2 seconds
          setTimeout(() => {
            router.push("/exercises/a/1")
          }, 2000)
        } else {
          setStatus("error")
          setMessage(data.error || "Invalid or expired access link")
        }
      } catch (error) {
        setStatus("error")
        setMessage("Failed to validate access link")
      }
    }

    validateToken()
  }, [params.token, router])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-purple-900/20 to-black">
      <Card className="max-w-md w-full bg-black/40 border-purple-500/30 backdrop-blur">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
            {status === "validating" && <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />}
            {status === "success" && <CheckCircle2 className="w-8 h-8 text-green-400" />}
            {status === "error" && <XCircle className="w-8 h-8 text-red-400" />}
          </div>
          <CardTitle className="text-2xl text-white">
            {status === "validating" && "Validating Access"}
            {status === "success" && "Access Granted!"}
            {status === "error" && "Access Denied"}
          </CardTitle>
          <CardDescription className="text-purple-200">{message}</CardDescription>
        </CardHeader>
        {status === "error" && (
          <CardContent className="text-center">
            <Button asChild className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              <a href="/subscribe">Subscribe Now</a>
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
