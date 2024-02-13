import CardGrid from "./components/CardGrid";
import { prisma } from "./lib/db/prisma";

export default async function Home() {
  const links = await prisma.linkItem.findMany()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CardGrid title="Starters" links={links} />
    </main>
  );
}
