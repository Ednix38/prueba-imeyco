import type { APIRoute } from "astro";
import { createUser } from "../../services/user.service";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    const name = formData.get("name");
    const email = formData.get("email");

    if (!name || !email) {
      return new Response(
        JSON.stringify({ success: false, message: "Datos requeridos" }),
        { status: 400 }
      );
    }

    const result = await createUser(
      String(name),
      String(email)
    );

    return new Response(
      JSON.stringify(result),
      { status: 200 }
    );

  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, message: "Error interno" }),
      { status: 500 }
    );
  }
};
