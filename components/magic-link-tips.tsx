/**
 * Shown after we email a magic link — reduces support load for new users.
 */
export function MagicLinkTips() {
  return (
    <div className="rounded-lg border border-purple-500/25 bg-purple-500/5 px-3 py-3 text-left space-y-2">
      <p className="text-purple-200/90 text-xs font-medium">First time or on a phone?</p>
      <ul className="text-white/55 text-xs leading-relaxed list-disc pl-4 space-y-1.5">
        <li>
          Open the link in <span className="text-white/75">Safari or Chrome</span>. In-app mail browsers often fail—then{" "}
          <span className="text-white/75">copy the link and paste it into the address bar</span>.
        </li>
        <li>
          Only the <span className="text-white/75">newest</span> email works. If you click &quot;send again,&quot; ignore older emails.
        </li>
        <li>
          Use the link within a few minutes. Check spam/junk.
        </li>
        <li>
          Subscribed with Stripe? Sign in with the <span className="text-white/75">same email</span> you paid with.
        </li>
      </ul>
    </div>
  )
}
