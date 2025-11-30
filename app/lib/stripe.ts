// File: app/lib/stripe.ts
import Stripe from 'stripe';
// 👇 1. IMPORT THE SUPABASE CLIENT
import { getSupabaseServerClient } from './supabaseServer'; 

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function getOrCreateCustomer({ userId, email }: { userId: string; email?: string }) {
  // 👇 2. INITIALIZE THE CLIENT INSIDE THE FUNCTION
  const supabase = getSupabaseServerClient(); 
  
  // 1. Check Supabase for linked customer ID
  let { data, error } = await supabase.from('profiles') // or users
    .select('stripe_customer_id')
    .eq('id', userId)
    .single();

  // ... rest of your code
}
