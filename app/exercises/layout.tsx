import { createClient } from "@/lib/supabase/server"
import { AccessGate } from "@/components/access-gate"
import { redirect } from "next/navigation"

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

  if (!email) {
    redirect("/auth/login?redirect=/exercises")
  }

  return <AccessGate userEmail={email}>{children}</AccessGate>
}
