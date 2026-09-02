"use server";

import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { revalidatePath } from "next/cache";

export async function notifyDonation(data: {
  name: string;
  email?: string;
  amount: number;
  purpose?: string;
  message?: string;
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
    endpoint: "donation",
    limit: 10,
    windowSeconds: 60 * 60,
  });
  if (!success) {
    return { success: false, error: "Too many submissions. Please try again later." };
  }

  if (!data.name || !data.amount) {
    throw new Error("Name and amount are required.");
  }

  await prisma.donation.create({
    data: {
      name: data.name,
      email: data.email || null,
      amount: data.amount,
      purpose: data.purpose || null,
      message: data.message || null,
    },
  });

  await sendEmail({
    subject: `New Donation Notification – ${data.name}`,
    html: `
      <h2 style="color:#1e3a8a;">Donation Received</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email || "Not provided"}</p>
      <p><strong>Amount:</strong> ₦${data.amount.toLocaleString()}</p>
      <p><strong>Purpose:</strong> ${data.purpose || "Not specified"}</p>
      <p><strong>Message:</strong> ${data.message || "None"}</p>
    `,
  });

  revalidatePath("/admin/donations");
  return { success: true };
}