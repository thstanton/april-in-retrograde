import CardGrid from "./components/CardGrid";
import FoodCard from "./components/FoodCard";
import PlayListCard from "./components/PlaylistCard";
import { prisma } from "./lib/db/prisma";

export default async function Home() {
  const links = await prisma.linkItem.findMany()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CardGrid links={links} />
    </main>
  );
}
