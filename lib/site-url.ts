/** Production host when NEXT_PUBLIC_SITE_URL is unset (e.g. local dev, misconfigured preview). */
export const DEFAULT_PRODUCTION_SITE_URL = "https://studiomain1.vercel.app"

function productionSiteHostname(): string {
  try {
    return new URL(DEFAULT_PRODUCTION_SITE_URL).hostname
  } catch {
    return "studiomain1.vercel.app"
  }
}

/**
 * Origin embedded in magic-link `redirect_to` / `emailRedirectTo`.
 * Call from the browser (e.g. on submit).
 *
 * Vercel **preview** hosts (e.g. `project-abc123-team.vercel.app`) are rarely all
 * listed in Supabase → Supabase rejects `signInWithOtp` with "Error sending confirmation email".
 * For any `*.vercel.app` host that is not the canonical production hostname, we use
 * {@link DEFAULT_PRODUCTION_SITE_URL} so the redirect URL matches your allow list.
 * The user completes sign-in on production; preview tabs do not share those cookies.
 */
export function getEmailRedirectOrigin(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (configured) return configured.replace(/\/$/, "")

  if (typeof window !== "undefined" && window.location?.origin) {
    const o = window.location.origin
    if (o.startsWith("http://localhost") || o.startsWith("http://127.0.0.1")) {
      return o
    }
    if (o.startsWith("https://")) {
      try {
        const host = new URL(o).hostname
        const prodHost = productionSiteHostname()
        if (host.endsWith(".vercel.app") && host !== prodHost) {
          return DEFAULT_PRODUCTION_SITE_URL
        }
      } catch {
        /* fall through */
      }
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
