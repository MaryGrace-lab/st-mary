// lib/email.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const OFFICE_EMAIL = process.env.PARISH_OFFICE_EMAIL!;
const FROM_EMAIL = process.env.EMAIL_FROM || "St. Mary Catholic Church <notifications@stmaryobe.org>";

export async function sendEmail({
  subject,
  html,
}: {
  subject: string;
  html: string;
}) {
  if (process.env.NODE_ENV !== "production") {
    console.log("📧 Email not sent (dev mode):", subject);
    return { success: true, test: true };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: OFFICE_EMAIL,
      subject,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error };
    }

    return { success: true, id: data?.id };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error };
  }
}