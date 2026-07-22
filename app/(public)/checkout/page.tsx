import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import CheckoutClient from "./CheckoutClient";

interface PageProps {
  searchParams: Promise<{ bookingId?: string }>;
}

export default async function CheckoutPage({ searchParams }: PageProps) {
  const params = await searchParams;
  if (!params?.bookingId) redirect("/mass-booking");

  const booking = await prisma.massBooking.findUnique({
    where: { id: params.bookingId },
  });

  if (!booking || booking.status !== "PENDING") redirect("/mass-booking");

  return <CheckoutClient booking={booking} />;
}