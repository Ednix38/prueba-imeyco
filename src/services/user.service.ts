import { supabase } from "../lib/supabase";

export async function createUser(email: string, name: string) {
  if (!email || !name) {
    throw new Error("Datos requeridos");
  }

  const { error } = await supabase
    .from("user")
    .insert({ email, name });

  if (error) {
    throw new Error(error.message);
  }

  return { success: true };
}
