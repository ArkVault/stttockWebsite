"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function updateLeadStatus(id: string, status: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from("leads")
    .update({ status })
    .eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/crm")
}

export async function updateLeadNotes(id: string, notas: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from("leads")
    .update({ notas })
    .eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/crm")
}
