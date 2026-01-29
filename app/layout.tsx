import type React from "react"
import type { Metadata, Viewport } from "next"
import { Oswald, Bebas_Neue } from "next/font/google"
import "./globals.css"

const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" })
const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" })

export const metadata: Metadata = {
  title: "Pineal Vision | 3rd Eye CrossTrainer",
  description:
    "Stereoscopic video exercises designed to decalcify and activate your pineal gland. Reconnect with your spiritual interface.",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#1a1625",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (window.location.pathname === '/' && window.location.search.includes('code=')) {
                  var params = new URLSearchParams(window.location.search);
                  var code = params.get('code');
                  if (code) {
                    window.location.replace('/auth/callback?code=' + code + '&type=recovery');
                  }
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${oswald.className} ${oswald.variable} ${bebasNeue.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
