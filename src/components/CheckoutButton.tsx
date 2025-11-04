
'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { createCheckoutSession } from '@/app/stripe/actions';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { user, idToken } = useAuth();
  const router = useRouter();

  const handleCheckout = async () => {
    if (!user) {
      router.push('/login');
      return;
    }
    if (!idToken) {
      console.error("No ID token available");
      return;
    }
    
    setIsLoading(true);
    try {
      const { sessionId, error } = await createCheckoutSession(idToken);
      if (error || !sessionId) {
        throw new Error(error || 'Failed to create checkout session.');
      }

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe.js has not loaded yet.');
      }

      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId });
      if (stripeError) {
        console.error('Stripe redirect error:', stripeError);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      // Here you could show a toast notification to the user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleCheckout} disabled={isLoading} className="w-full" size="lg">
      {isLoading ? (
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      ) : null}
      Upgrade to Active
    </Button>
  );
}
