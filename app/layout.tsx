import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children} {/* Your page content will render here */}
      </body>
    </html>
  );
}
