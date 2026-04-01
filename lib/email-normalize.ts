/** Stripe / Supabase may disagree on email casing; use everywhere we key on email. */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}
