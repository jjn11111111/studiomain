'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { createBillingPortalSession } from '@/app/stripe/actions';

export default function ProfileClient() {
  const { user, userProfile, idToken, signOutUser, isLoading } = useAuth();
  const [isPortalLoading, setIsPortalLoading] = useState(false);

  const handleManageSubscription = async () => {
    if (!idToken) return;

    setIsPortalLoading(true);
    try {
      const { url, error } = await createBillingPortalSession(idToken);
      if (error) {
        console.error('Error creating portal session:', error);
        // You could show a toast here
      } else if (url) {
        window.location.href = url;
      }
    } finally {
      setIsPortalLoading(false);
    }
  };


  if (isLoading) {
    return <div className="flex justify-center items-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  if (!user || !userProfile) {
    return <p>You are not logged in.</p>;
  }

  const subscriptionStatus = userProfile.subscription?.status ?? 'free';
  const isSubscribed = subscriptionStatus === 'active';

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-semibold">Email</h3>
        <p className="text-muted-foreground">{user.email}</p>
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold">Subscription Status</h3>
        <p className={`font-medium ${isSubscribed ? 'text-green-600' : 'text-muted-foreground'}`}>
          {isSubscribed ? 'Active' : 'Free Tier'}
        </p>
      </div>

      <Button onClick={signOutUser} variant="destructive">Log Out</Button>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Manage Subscription</CardTitle>
          <CardDescription>
            {isSubscribed 
              ? 'Manage your billing and subscription details.' 
              : 'You are currently on the free plan. Upgrade to unlock all features.'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSubscribed ? (
            <Button onClick={handleManageSubscription} disabled={isPortalLoading}>
              {isPortalLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Manage Subscription
            </Button>
          ) : (
            <Button asChild>
              <Link href="/pricing">Upgrade to Active</Link>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
