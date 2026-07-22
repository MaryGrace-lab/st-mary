// lib/email.ts
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // use "gmail" if using Gmail, otherwise use "SMTP" with host/port
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const OFFICE_EMAIL = process.env.PARISH_OFFICE_EMAIL!;

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
    await transporter.sendMail({
      from: `"St. Mary Catholic Church" <${process.env.EMAIL_USER}>`,
      to: OFFICE_EMAIL,
      subject,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error };
  }
}