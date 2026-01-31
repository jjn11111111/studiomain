import { Header } from "@/components/header"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight } from "lucide-react"
import { createClient } from "@supabase/supabase-js"
import Stripe from "stripe"

// Add subscriber directly on success page load - more reliable than webhook
async function addSubscription(sessionId: string) {
  if (!sessionId) return null
  
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    const email = session.customer_email || session.customer_details?.email
    
    if (!email) return null
    
    // Check if subscription already exists
    const { data: existing } = await supabase
      .from("subscriptions")
      .select("id")
      .eq("email", email)
      .single()
    
    if (existing) {
      // Update existing
      await supabase
        .from("subscriptions")
        .update({
          status: "active",
          stripe_customer_id: session.customer as string,
          current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        })
        .eq("email", email)
    } else {
      // Insert new
      await supabase
        .from("subscriptions")
        .insert({
          email: email,
          status: "active",
          stripe_customer_id: session.customer as string,
          current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        })
    }
    
    return email
  } catch (error) {
    console.error("Error adding subscription:", error)
    return null
  }
}

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const params = await searchParams
  const email = await addSubscription(params.session_id || "")
  
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <div className="pt-24 pb-16 px-4 max-w-2xl mx-auto text-center">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-white mb-4">Welcome to Pineal Vision!</h1>
        <p className="text-white/80 text-lg mb-4">
          Your subscription is now active. You have full access to all exercises and modules.
        </p>
        {email && (
          <p className="text-green-400 text-sm mb-4">
            Subscription activated for: {email}
          </p>
        )}
        <p className="text-white/60 text-sm mb-8">
          Create your account using the same email you subscribed with to access your training.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/sign-up">
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold px-8 py-3 rounded-full">
              Create Account <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button variant="outline" className="border-purple-500/30 text-white hover:bg-purple-500/10 px-8 py-3 rounded-full bg-transparent">
              Already have an account? Login
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
