"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, ArrowLeft, Lock, CheckCircle } from "lucide-react"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isVerifying, setIsVerifying] = useState(true)
  const [tokenHash, setTokenHash] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    
    const verifyToken = async () => {
      const urlParams = new URLSearchParams(window.location.search)
      const hash = urlParams.get("token_hash")
      const type = urlParams.get("type")
      
      // Store the token hash for later use
      if (hash) {
        setTokenHash(hash)
      }
      
      if (hash && type === "recovery") {
        const { data, error: verifyError } = await supabase.auth.verifyOtp({
          token_hash: hash,
          type: "recovery",
        })
        
        if (!verifyError && data.session) {
          window.history.replaceState(null, "", window.location.pathname)
          setIsVerifying(false)
          return
        }
        // If verify failed, we'll try to use the token when updating password
      }
      
      // Check if we already have a session
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setIsVerifying(false)
        return
      }
      
      // No session and no valid token - but let them try anyway
      setIsVerifying(false)
    }
    
    verifyToken()
  }, [])

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    const supabase = createClient()
    setIsLoading(true)

    try {
      // Check for existing session first
      let { data: { session } } = await supabase.auth.getSession()
      
      // If no session but we have a token, try to verify it again
      if (!session && tokenHash) {
        const { data, error: verifyError } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: "recovery",
        })
        if (verifyError) {
          setError("Reset link expired. Please request a new one.")
          setIsLoading(false)
          return
        }
        session = data.session
      }
      
      if (!session) {
        setError("Session expired. Please request a new reset link.")
        setIsLoading(false)
        return
      }
      
      const { error } = await supabase.auth.updateUser({
        password: password,
      })
      if (error) throw error
      setIsSuccess(true)
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/auth/login")
      }, 3000)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Failed to reset password")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="p-4">
        <Link href="/auth/login" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Sign In
        </Link>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="relative">
              <Eye className="h-10 w-10 text-purple-400" />
              <div className="absolute inset-0 blur-sm bg-purple-400/30 rounded-full" />
            </div>
            <span className="font-sans text-2xl font-semibold tracking-wide text-white">
              Pineal Vision
            </span>
          </div>

          {/* Card */}
          <div className="bg-white/5 border border-purple-500/20 rounded-2xl p-8 backdrop-blur-sm">
            {isSuccess ? (
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-16 w-16 text-green-400" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">Password Reset!</h1>
                <p className="text-white/60 mb-6">
                  Your password has been successfully updated.
                </p>
                <p className="text-white/40 text-sm mb-6">
                  Redirecting you to sign in...
                </p>
                <Link href="/auth/login">
                  <Button 
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold px-8 py-6 rounded-full"
                  >
                    Sign In Now
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <div className="flex justify-center mb-4">
                  <Lock className="h-12 w-12 text-purple-400" />
                </div>
                <h1 className="text-2xl font-bold text-white text-center mb-2">Set New Password</h1>
                <p className="text-white/60 text-center mb-8">
                  Enter your new password below.
                </p>

                <form onSubmit={handleResetPassword} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white/80">New Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="At least 6 characters"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-black/40 border-purple-500/30 text-white placeholder:text-white/40 focus:border-purple-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-white/80">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="bg-black/40 border-purple-500/30 text-white placeholder:text-white/40 focus:border-purple-400"
                    />
                  </div>

                  {error && !isVerifying && (
                    <p className="text-red-400 text-sm text-center">{error}</p>
                  )}
                  
                  {isVerifying && (
                    <p className="text-white/60 text-sm text-center">Verifying reset link...</p>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold py-6 rounded-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Updating..." : "Reset Password"}
                  </Button>
                </form>

                <div className="mt-6 text-center text-sm text-white/60">
                  Need a new reset link?{" "}
                  <Link href="/auth/forgot-password" className="text-purple-400 hover:text-purple-300 underline underline-offset-4">
                    Request again
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
