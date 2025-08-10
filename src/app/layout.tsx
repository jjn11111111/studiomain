import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: '3rd Eye CrossTraining',
  description: 'Stimulate your 3rd eye Pineal gland with stereoscopic video exercises.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased min-h-screen flex flex-col bg-background text-foreground')}>
        <main className="flex-grow flex flex-col">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
