"use server";

import { createClient } from "@/lib/supabase/server";
import { sendLeadNotification } from "@/lib/email";
import { revalidatePath } from "next/cache";

export type LeadFormData = {
  nombre: string;
  negocio: string;
  correo: string;
  telefono: string;
  plan: "cadena" | "enterprise";
  sucursales: number;
  meseros: number;
  jefes_barra: number;
  managers: number;
  admins: number;
};

export async function submitLead(data: LeadFormData) {
  const supabase = await createClient();

  const { error } = await supabase.from("leads").insert({
    nombre: data.nombre,
    negocio: data.negocio,
    correo: data.correo,
    telefono: data.telefono,
    plan: data.plan,
    sucursales: data.sucursales,
    meseros: data.meseros,
    jefes_barra: data.jefes_barra,
    managers: data.managers,
    admins: data.admins,
    status: "nuevo",
  });

  if (error) throw new Error(error.message);

  sendLeadNotification(data).catch((err) =>
    console.error("Lead email notification failed:", err),
  );

  revalidatePath("/crm");
  return { success: true };
}
