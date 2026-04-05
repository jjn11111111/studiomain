/** Short, consistent strings for auth + subscription UI. */

export const MSG_SAME_EMAIL_AS_CHECKOUT =
  "Sign in with the same email you used when you paid."

export const MSG_LINK_FAILED =
  "That sign-in link didn’t work. Send a new one below."

/** Magic link reached the app without a valid token (broken or stripped link). */
export const MSG_AUTH_NO_PARAMS =
  "That sign-in didn’t complete. Try Continue with Google, or sign in with email and password."

/** PKCE code exchange failed (e.g. OAuth redirect issue). */
export const MSG_AUTH_EXCHANGE =
  "Sign-in didn’t finish. Try Continue with Google again, or use email and password."

/** verifyOtp / token link failed (rare; recovery or old links). */
export const MSG_AUTH_VERIFY =
  "That link expired or was already used. Use Google or email and password."

/** Client callback timed out waiting for a session. */
export const MSG_AUTH_CLIENT_POLL =
  "Sign-in didn’t finish in this window. Try Google or email and password."

export const MSG_AUTH_CHOOSE_GOOGLE_OR_PASSWORD =
  "Use Google, or sign in with email and password."

export const MSG_SIGNUP_CHOOSE_GOOGLE_OR_PASSWORD =
  "Use Google, or create an account with email and password."

/** Subscribe page — align Stripe customer email with the account used to log in. */
export const MSG_CHECKOUT_MATCH_LOGIN_EMAIL =
  "Use the same email you use to log in (Google or password). If you’re already signed in, we pre-fill it—keep it for checkout."
