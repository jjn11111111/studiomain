/** Short, consistent strings for auth + subscription UI. */

export const MSG_CHECK_EMAIL = "We sent a link. Open it once—it expires quickly."

export const MSG_SAME_EMAIL_AS_CHECKOUT =
  "Sign in with the same email you used when you paid."

export const MSG_LINK_FAILED =
  "That sign-in link didn’t work. Send a new one below."

/** Magic link hit /api/auth/callback with no ?code= or ?token_hash= (broken link, scanner, or wrong template). */
export const MSG_AUTH_NO_PARAMS =
  "That link was missing the sign-in token—try “Open in browser” from your mail app, or request a new link. If it keeps happening, the email template should use token_hash (see AUTH.md)."

/** PKCE code exchange failed (wrong browser/device, expired, or second click). */
export const MSG_AUTH_EXCHANGE =
  "That link couldn’t complete sign-in—often the mail app opened a different browser than where you asked for the link. Try again on the same device, or use “Open in browser,” then request a new link. Best fix: Supabase Magic link template with token_hash (AUTH.md)."

/** verifyOtp failed for token_hash links. */
export const MSG_AUTH_VERIFY =
  "That link expired or was already used. Request a new link below."

/** /auth/callback client couldn’t see a session (hash flow / in-app browser). */
export const MSG_AUTH_CLIENT_POLL =
  "Sign-in didn’t finish in this window—open the email link in Safari or Chrome (not the in-app browser), or request a new link."

export const MSG_EMAIL_SEND_FAIL =
  "We couldn’t send the email. Wait a moment and try again."

export const MSG_RATE_LIMIT = "Wait a few seconds, then try again."
