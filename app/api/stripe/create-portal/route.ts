import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabaseServer';
import { getOrCreateCustomer, stripe } from '@/lib/stripe';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const supabase = await getSupabaseServerClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get or create customer
    const customer = await getOrCreateCustomer({ 
      userId: user.id, 
      email: user.email ?? undefined 
    });

    const origin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // Create a portal session
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: `${origin}/account`,
    });

    return NextResponse.json({ url: portalSession.url }, { status: 200 });
  } catch (e: any) {
    console.error('Portal creation error:', e);
    return NextResponse.json(
      { error: e.message ?? 'Portal creation error' },
      { status: 400 }
    );
  }
}
