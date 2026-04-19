import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { CrmDashboard } from "@/components/crm-dashboard"

export default async function CrmPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/crm/login")

  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })

  return <CrmDashboard leads={leads ?? []} />
}
