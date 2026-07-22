// app/admin/(protected)/layout.tsx
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { Toaster } from "sonner";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  return (
    <AdminShell>
      {children}
      <Toaster position="top-right" richColors />
    </AdminShell>
  );
}