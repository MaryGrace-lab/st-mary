// app/admin/homilies/page.tsx
import { prisma } from "@/lib/prisma";
import AddHomilyForm from "./AddHomilyForm";
import HomiliesList from "./HomiliesList";

export default async function AdminHomiliesPage() {
  const homilies = await prisma.homily.findMany({ orderBy: { publishedAt: "desc" } });

  return (
    <div>
      <h1 className="text-3xl font-black text-blue-900 mb-8">Manage Homilies</h1>
      <AddHomilyForm />
      <HomiliesList homilies={homilies} />
    </div>
  );
}