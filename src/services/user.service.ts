import { supabaseServer } from "../lib/supabase.server.ts";

export async function createUser(name: string, email: string) {
  if (!name || !email) {
    return { success: false, message: "Datos requeridos" };
  }

  const { error } = await supabaseServer
    .from("user")
    .insert({ name, email });

  if (error) {
    throw error;
  }
  

  return { success: true };
}
