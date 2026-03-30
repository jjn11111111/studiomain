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
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const email = user?.email

  if (!email) {
    redirect("/auth/login?redirect=/exercises")
  }

  return <AccessGate userEmail={email}>{children}</AccessGate>
}
