// src/pages/api/deploy-notify.ts
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const payload = await request.json();

  const message = `🚀 Deploy exitoso
Proyecto: ${payload.project?.name}
Branch: ${payload.payload?.deployment?.meta?.githubCommitRef}
URL: ${payload.payload?.deployment?.url}`;

  const res = await fetch(
    `https://graph.facebook.com/v22.0/${import.meta.env.PHONE_NUMBER_ID}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: "52XXXXXXXXXX", // número verificado
        type: "text",
        text: { body: message },
      }),
    }
  );

  return new Response("ok");
};
