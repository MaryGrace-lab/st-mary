"use server";

import { sendEmail } from "@/lib/email";

export async function notifyDonation(data: {
  name: string;
  email?: string;
  amount: number;
  purpose?: string;
  message?: string;
}) {
  if (!data.name || !data.amount) {
    throw new Error("Name and amount are required.");
  }

  await sendEmail({
    subject: `New Donation Notification – ${data.name}`,
    html: `
      <h2 style="color:#1e3a8a;">Donation Received</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email || "Not provided"}</p>
      <p><strong>Amount:</strong> ₦${data.amount.toLocaleString()}</p>
      <p><strong>Purpose:</strong> ${data.purpose || "Not specified"}</p>
      <p><strong>Message:</strong> ${data.message || "None"}</p>
      <br/>
      <p style="color:#6b7280;font-size:0.875rem;">This donation was reported by the donor. Please verify the transfer in the church bank account.</p>
    `,
  });

  return { success: true };
}