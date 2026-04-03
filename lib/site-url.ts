/** Production host when NEXT_PUBLIC_SITE_URL is unset (e.g. local dev, misconfigured preview). */
export const DEFAULT_PRODUCTION_SITE_URL = "https://studiomain1.vercel.app"

/**
 * Public origin for redirects (Stripe, auth emails, etc.).
 * Prefer explicit NEXT_PUBLIC_SITE_URL, then the current Vercel deployment host, then default production.
 */
export function getAppBaseUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (configured) return configured.replace(/\/$/, "")

  const vercel = process.env.VERCEL_URL?.trim()
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//, "")
    return `https://${host}`
  }

  return DEFAULT_PRODUCTION_SITE_URL
}
