"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

const ALLOWED_EMAILS = (process.env.CRM_ALLOWED_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean)

export async function crmLogin(formData: FormData) {
  const email = (formData.get("email") as string).trim().toLowerCase()
  const password = formData.get("password") as string

  if (ALLOWED_EMAILS.length > 0 && !ALLOWED_EMAILS.includes(email)) {
    return { error: "No tienes acceso al CRM" }
  }

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
