/** Production host when NEXT_PUBLIC_SITE_URL is unset (e.g. local dev, misconfigured preview). */
export const DEFAULT_PRODUCTION_SITE_URL = "https://studiomain1.vercel.app"

/**
 * Origin embedded in magic-link `redirect_to` / `emailRedirectTo`.
 * Call from the browser (e.g. on submit). Uses NEXT_PUBLIC_SITE_URL when set;
 * otherwise the current tab origin so preview deploys (*.vercel.app) match Supabase Redirect URLs.
 */
export function getEmailRedirectOrigin(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (configured) return configured.replace(/\/$/, "")

  if (typeof window !== "undefined" && window.location?.origin) {
    const o = window.location.origin
    if (
      o.startsWith("https://") ||
      o.startsWith("http://localhost") ||
      o.startsWith("http://127.0.0.1")
    ) {
      return o
    }
  }

  return DEFAULT_PRODUCTION_SITE_URL
}

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
