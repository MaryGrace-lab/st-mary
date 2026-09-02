"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import crypto from "crypto";
import { sendEmail } from "@/lib/email";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

// ── Admin guard ──
async function requireAdmin() {
  const session = await auth();
  if (!session || session.user?.role !== "admin") {
    redirect("/admin/login");
  }
}

// Generate a unique booking reference
function generateReference(): string {
  return `MB-${Date.now()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
}

// ── Public: submit a mass booking ──
export async function sendMassBooking(data: {
  name: string;
  email?: string;
  phone: string;
  intentionType: string;
  location: string;
  bookDate: string;
  massTime?: string;
  amount: number;
  namesToPrayFor?: string;
  additionalInfo?: string;
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
    endpoint: "mass-booking",
    limit: 10,
    windowSeconds: 60 * 60, // 1 hour
  });
  if (!success) {
    return { success: false, error: "Too many submissions. Please try again later." };
  }

  if (
    !data.name ||
    !data.phone ||
    !data.intentionType ||
    !data.location ||
    !data.bookDate ||
    !data.amount ||
    !data.consent
  ) {
    return { success: false, error: "Missing required fields" };
  }

  const reference = generateReference();

  const booking = await prisma.massBooking.create({
    data: {
      name: data.name,
      email: data.email || null,
      phone: data.phone,
      intentionType: data.intentionType,
      location: data.location,
      bookDate: new Date(data.bookDate),
      massTime: data.massTime || null,
      namesToPrayFor: data.namesToPrayFor || null,
      additionalInfo: data.additionalInfo || null,
      amount: data.amount,
      consent: data.consent,
      reference,
      paymentInitiated: false,
    },
  });

  revalidatePath("/admin/mass-bookings");
  revalidatePath("/");
  return { success: true, bookingId: booking.id, reference };
}

// ── Public: user confirms they have made the bank transfer ──
export async function markPaymentInitiated(bookingId: string) {
  const booking = await prisma.massBooking.findUnique({ where: { id: bookingId } });
  if (!booking) throw new Error("Booking not found");

  await prisma.massBooking.update({
    where: { id: bookingId },
    data: { paymentInitiated: true },
  });

  // Send email to parish office
  await sendEmail({
    subject: `New Mass Booking – ${booking.name}`,
    html: `
      <h2 style="color:#1e3a8a;">New Mass Booking Request (Payment Confirmed)</h2>
      <p><strong>Name:</strong> ${booking.name}</p>
      <p><strong>Phone:</strong> ${booking.phone}</p>
      <p><strong>Email:</strong> ${booking.email || "Not provided"}</p>
      <p><strong>Intention:</strong> ${booking.intentionType}</p>
      <p><strong>Location:</strong> ${booking.location}</p>
      <p><strong>Date:</strong> ${booking.bookDate.toLocaleDateString("en-NG", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })}</p>
      <p><strong>Mass Time:</strong> ${booking.massTime || "Not specified"}</p>
      <p><strong>Amount:</strong> ₦${booking.amount.toLocaleString()}</p>
      <p><strong>Reference:</strong> ${booking.reference}</p>
      <p><strong>Names to Pray For:</strong> ${booking.namesToPrayFor || "N/A"}</p>
      <p><strong>Additional Info:</strong> ${booking.additionalInfo || "N/A"}</p>
      <br/>
      <p><a href="${process.env.BASE_URL}/admin/mass-bookings" style="display:inline-block;padding:10px 20px;background:#1e3a8a;color:white;border-radius:8px;text-decoration:none;">Manage Bookings</a></p>
    `,
  });

  revalidatePath("/admin/mass-bookings");
  return { success: true };
}

// ── Admin: update booking status ──
export async function updateBookingStatus(
  id: string,
  status: "PENDING" | "CONFIRMED" | "CANCELLED"
) {
  await requireAdmin();

  const booking = await prisma.massBooking.findUnique({ where: { id } });
  if (!booking) throw new Error("Booking not found");

  await prisma.massBooking.update({
    where: { id },
    data: { status },
  });

  if (status === "CONFIRMED" && booking.email) {
    await sendEmail({
      subject: `Your Mass Booking is Confirmed – ${booking.reference}`,
      html: `
        <h2 style="color:#1e3a8a;">Mass Booking Confirmed</h2>
        <p>Dear ${booking.name},</p>
        <p>Your mass booking has been confirmed. Here are the details:</p>
        <p><strong>Intention:</strong> ${booking.intentionType}</p>
        <p><strong>Location:</strong> ${booking.location}</p>
        <p><strong>Date:</strong> ${booking.bookDate.toLocaleDateString("en-NG", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}</p>
        <p><strong>Mass Time:</strong> ${booking.massTime || "Not specified"}</p>
        <p><strong>Amount:</strong> ₦${booking.amount.toLocaleString()}</p>
        <p><strong>Reference:</strong> ${booking.reference}</p>
        <p>Thank you and God bless you.</p>
        <p>St. Mary Catholic Church, Obe Quarter</p>
      `,
    });
  }

  revalidatePath("/admin/mass-bookings");
  return { success: true };
}

// ── Admin: delete a booking ──
export async function deleteMassBooking(id: string) {
  await requireAdmin();

  await prisma.massBooking.delete({ where: { id } });

  revalidatePath("/admin/mass-bookings");
  return { success: true };
}