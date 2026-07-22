"use server";

// app/(public)/contact/actions.ts
// Server action to handle contact form submissions.
// For production, integrate a mail service (Resend, Nodemailer) and store to DB if needed.

export async function sendContactMessage(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  consent: boolean;
}) {
  // Server‑side double check
  if (!data.name || !data.email || !data.subject || !data.message || !data.consent) {
    return { success: false, error: "Missing required fields" };
  }

  // TODO: send email to parish office (e.g., using Resend)
  // console.log("Contact form submission:", data);

  return { success: true };
}