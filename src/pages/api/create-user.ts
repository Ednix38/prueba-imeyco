import type { APIRoute } from "astro";
import { createUser } from "../../services/user.service";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  const { email, name } = data;

  const result = await createUser(email, name);

  return new Response(JSON.stringify(result), {
    status: result.success ? 200 : 400
  });
};
