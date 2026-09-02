"use server";

import { sendEmail } from "@/lib/email";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

export async function sendContactMessage(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  consent: boolean;
  honeypot?: string;
}) {
  // Honeypot check
  if (data.honeypot && data.honeypot.length > 0) {
    console.log("Spam detected (honeypot filled)");
    return { success: false, error: "Spam detected" };
  }

  // Rate limiting
  const ip = await getClientIp();
  const { success } = await checkRateLimit(ip, {
    endpoint: "contact",
    limit: 10,
    windowSeconds: 60 * 60,
  });
  if (!success) {
    return { success: false, error: "Too many submissions. Please try again later." };
  }

  if (!data.name || !data.email || !data.phone || !data.subject || !data.message || !data.consent) {
    return { success: false, error: "Missing required fields" };
  }

  await sendEmail({
    subject: `New Contact Message – ${data.subject}`,
    html: `
      <h2 style="color:#1e3a8a;">New Message from Website</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `,
  });

  return { success: true };
}