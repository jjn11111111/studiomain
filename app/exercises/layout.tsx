import { createClient } from "@/lib/supabase/server"
import { AccessGate } from "@/components/access-gate"

export const dynamic = "force-dynamic"

export default async function ExercisesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <AccessGate initialEmail={user?.email ?? null}>{children}</AccessGate>
  )
}
