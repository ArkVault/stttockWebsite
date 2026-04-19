"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function crmLogin(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error: "Credenciales incorrectas" }
  redirect("/crm")
}

export async function crmLogout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/crm/login")
}
