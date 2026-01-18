import { Header } from "@/components/header"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <div className="pt-24 pb-16 px-4 max-w-2xl mx-auto text-center">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-white mb-4">Welcome to Pineal Vision!</h1>
        <p className="text-white/80 text-lg mb-8">
          Your subscription is now active. You have full access to all exercises and modules.
        </p>
        <Link href="/exercises">
          <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold px-8 py-3 rounded-full">
            Start Training
          </Button>
        </Link>
      </div>
    </main>
  )
}
