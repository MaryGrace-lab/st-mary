import { prisma } from "@/lib/prisma";
import DonationsList from "./DonationsList";

export default async function AdminDonationsPage() {
  const donations = await prisma.donation.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-3xl font-black text-blue-900 mb-8">Donations</h1>
      <DonationsList donations={donations} />
    </div>
  );
}