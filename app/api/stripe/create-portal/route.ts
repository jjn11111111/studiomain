// Correct Path (Says lib is at the project root)
import { getSupabaseServerClient } from '@/lib/supabaseServer' 
import { getStripeCustomer, stripe } from '@/lib/stripe'

export async function POST() {
  try {
    const supabase = getSupabaseServerClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const customer = await getOrCreateCustomer({ userId: user.id, email: user.email ?? undefined })
    const origin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    const portal = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: `${origin}/account`,
    })

    return NextResponse.json({ url: portal.url }, { status: 200 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? 'Portal error' }, { status: 400 })
  }
}
