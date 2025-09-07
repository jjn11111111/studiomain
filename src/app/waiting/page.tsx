
import { Loader2 } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Loading...',
  // This meta tag is crucial for the redirect to work.
  other: {
    'http-equiv': 'refresh',
    content: '0; url=/training',
  },
};

export default function WaitingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
      <p className="text-lg text-muted-foreground">Please wait, preparing your session...</p>
    </div>
  );
}
