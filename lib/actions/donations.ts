"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

async function requireAdmin() {
  const session = await auth();
  if (!session || session.user?.role !== "admin") {
    redirect("/admin/login");
  }
}

export async function deleteDonation(id: string) {
  await requireAdmin();
  await prisma.donation.delete({ where: { id } });
  revalidatePath("/admin/donations");
  return { success: true };
}

export async function acknowledgeDonation(id: string) {
  await requireAdmin();
  await prisma.donation.update({
    where: { id },
    data: { status: "ACKNOWLEDGED" },
  });
  revalidatePath("/admin/donations");
  return { success: true };
}