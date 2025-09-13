'use client';

import { useAuth } from '@/hooks/use-auth';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function ProfileClient() {
  const { user, signOutUser, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex justify-center items-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  if (!user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-semibold">Email</h3>
        <p className="text-muted-foreground">{user.email}</p>
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold">Subscription Status</h3>
        <p className="text-muted-foreground">Free Tier</p>
      </div>

      <Button onClick={signOutUser} variant="destructive">Log Out</Button>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Manage Subscription</CardTitle>
          <CardDescription>You are currently on the free plan. Upgrade to unlock all features.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/pricing">Upgrade to Active</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
