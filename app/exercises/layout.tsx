import { createClient } from "@/lib/supabase/server"
import { AccessGate } from "@/components/access-gate"

export const dynamic = "force-dynamic"

export default async function ExercisesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: authUser } = await supabase.auth.getUser()
  let email = authUser.user?.email

  if (!email) {
    const { data: sessionData } = await supabase.auth.getSession()
    email = sessionData.session?.user?.email
  }

  // Never redirect to /auth/login from the server: cookie visibility in RSC is
  // unreliable on Vercel; AccessGate uses the browser Supabase client instead.
  return <AccessGate initialEmail={email ?? null}>{children}</AccessGate>
}
