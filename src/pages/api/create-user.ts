import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    const name = formData.get("name");
    const email = formData.get("email");

    // Validación básica
    if (
      !name || typeof name !== "string" ||
      !email || typeof email !== "string"
    ) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Nombre y correo son requeridos"
        }),
        { status: 400 }
      );
    }

    // Inserción en Supabase
    const { error } = await supabase
      .from("user")
      .insert({
        name,
        email
      });

    if (error) {
      return new Response(
        JSON.stringify({
          success: false,
          message: error.message
        }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );

  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error interno del servidor"
      }),
      { status: 500 }
    );
  }
};
