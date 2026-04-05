/** Short, consistent strings for auth + subscription UI. */

export const MSG_CHECK_EMAIL = "We sent a link. Open it once—it expires quickly."

export const MSG_SAME_EMAIL_AS_CHECKOUT =
  "Sign in with the same email you used when you paid."

export const MSG_LINK_FAILED =
  "That sign-in link didn’t work. Send a new one below."

/** Magic link reached the app without a valid token (broken or stripped link). */
export const MSG_AUTH_NO_PARAMS =
  "That email link didn’t work. Use Continue with Google, or request a new link below."

/** PKCE code exchange failed (mail app browser ≠ where you asked for the link, expired link, etc.). */
export const MSG_AUTH_EXCHANGE =
  "That email link didn’t finish sign-in. Use Continue with Google instead, or request a new link and open it in the same browser where you started."

/** verifyOtp / token link failed. */
export const MSG_AUTH_VERIFY =
  "That link expired or was already used. Use Continue with Google, or request a new link below."

/** Client callback timed out waiting for a session. */
export const MSG_AUTH_CLIENT_POLL =
  "Sign-in didn’t finish here. Use Continue with Google, or try the email link again."

export const MSG_AUTH_CHOOSE_GOOGLE_OR_EMAIL =
  "Use Google for the simplest sign-in. Or enter your email for a one-time link."

export const MSG_EMAIL_SEND_FAIL =
  "We couldn’t send the email. Wait a moment and try again."

export const MSG_RATE_LIMIT = "Wait a few seconds, then try again."

/** Subscribe page — align Stripe customer email with the account used to log in. */
export const MSG_CHECKOUT_MATCH_LOGIN_EMAIL =
  "Use the same email you use to log in (Google or magic link). If you’re already signed in, we pre-fill it—keep it for checkout."
