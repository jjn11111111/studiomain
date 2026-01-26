import Link from "next/link"
import { Eye, Mail, ArrowLeft } from "lucide-react"

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="p-4">
        <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
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
          <div className="bg-white/5 border border-purple-500/20 rounded-2xl p-8 backdrop-blur-sm text-center">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-purple-400" />
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-2">Check Your Email</h1>
            <p className="text-white/60 mb-6">
              {"We've sent you a confirmation link. Please check your email to verify your account before signing in."}
            </p>
            
            <div className="pt-4 border-t border-white/10">
              <p className="text-white/40 text-sm">
                {"Didn't receive the email? Check your spam folder or "}
                <Link href="/auth/sign-up" className="text-purple-400 hover:text-purple-300 underline underline-offset-4">
                  try again
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
