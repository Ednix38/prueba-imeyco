const fetch = require("node-fetch");

const phoneNumberId = process.env.PHONE_NUMBER_ID;
const token = process.env.WHATSAPP_TOKEN;
const recipient = process.env.WHATSAPP_RECIPIENT;
const message = process.env.DEPLOY_MESSAGE || "✅ Deploy exitoso!";

async function sendWhatsApp() {
  const res = await fetch(
    `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: recipient,
        type: "text",
        text: { body: message },
      }),
    }
  );

  const data = await res.json();
  console.log("WhatsApp response:", data);
}

sendWhatsApp().catch(console.error);
