import { NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabaseServer'
import { getOrCreateCustomer, stripe } from '@/lib/stripe'

const PRICE_ID = process.env.STRIPE_PRICE_ID!

export async function POST() {
  try {
    const supabase = getSupabaseServerClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const customer = await getOrCreateCustomer({ userId: user.id, email: user.email ?? undefined })
    const origin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customer.id,
      line_items: [{ price: PRICE_ID, quantity: 1 }],
      success_url: `${origin}/account?success=1`,
      cancel_url: `${origin}/pricing?canceled=1`,
      allow_promotion_codes: true,
      metadata: { user_id: user.id },
    })

    return NextResponse.json({ url: session.url }, { status: 200 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? 'Checkout error' }, { status: 400 })
  }
}
