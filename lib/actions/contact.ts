"use server";

import { sendEmail } from "@/lib/email";

export async function sendContactMessage(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  consent: boolean;
}) {
  if (!data.name || !data.email || !data.subject || !data.message || !data.consent) {
    return { success: false, error: "Missing required fields" };
  }

  await sendEmail({
    subject: `New Contact Message – ${data.subject}`,
    html: `
      <h2 style="color:#1e3a8a;">New Message from Website</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || "Not provided"}</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `,
  });

  return { success: true };
}