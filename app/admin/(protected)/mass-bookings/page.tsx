import { prisma } from "@/lib/prisma";
import BookingsList from "./BookingsList";

export default async function AdminMassBookingsPage() {
  const bookings = await prisma.massBooking.findMany({
    where: {
      paymentInitiated: true,   // only show after user clicked "I've Made This Payment"
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-3xl font-black text-blue-900 mb-8">Mass Bookings</h1>
      <BookingsList bookings={bookings} />
    </div>
  );
}