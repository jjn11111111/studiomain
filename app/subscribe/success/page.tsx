import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900/20 to-black flex items-center justify-center p-4">
      <Card className="bg-black/40 border-purple-500/30 backdrop-blur max-w-md">
        <CardHeader className="text-center">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <CardTitle className="text-3xl text-white">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-purple-200">
            Thank you for subscribing to Pineal Vision! Check your email for your access link.
          </p>
          <p className="text-sm text-purple-300">
            The access link will be sent to the email you provided during checkout. Click the link to unlock all
            training modules.
          </p>
          <Button
            asChild
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Link href="/">Return to Home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
