
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold font-headline text-foreground">Choose Your Plan</h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            Unlock your full potential with the Active subscription.
          </p>
        </div>

        <div className="flex justify-center">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">Active Plan</CardTitle>
              <CardDescription>All access. All features. One simple price.</CardDescription>
              <div className="mt-4">
                <span className="text-5xl font-bold">$11.11</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-primary mr-2" />
                  <span>Access to all training modules</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-primary mr-2" />
                  <span>Unlimited journal entries</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-primary mr-2" />
                  <span>Exclusive new content & exercises</span>
                </li>
                 <li className="flex items-center">
                  <Check className="h-5 w-5 text-primary mr-2" />
                  <span>Support future development</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
                {/* This will trigger the checkout flow */}
                <Button className="w-full" size="lg">
                    Upgrade to Active
                </Button>
            </CardFooter>
          </Card>
        </div>
        <div className="text-center mt-8 text-muted-foreground">
            <p>You can cancel anytime. No questions asked.</p>
        </div>
      </main>
    </div>
  );
}
