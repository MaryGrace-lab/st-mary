"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
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

  // Save donation to database
  await prisma.donation.create({
    data: {
      name: data.name,
      email: data.email || null,
      amount: data.amount,
      purpose: data.purpose || null,
      message: data.message || null,
    },
  });

  // Send email notification
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

  revalidatePath("/admin/donations");
  return { success: true };
}