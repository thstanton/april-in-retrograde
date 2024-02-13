import CardGrid from "./components/CardGrid";
import FeatureCard from "./components/FeatureCard";
import Hero from "./components/Hero";
import TextBlock from "./components/TextBlock";
import { LinkWithCategoryAndKeywords } from "./lib/db/linksApi";
import { prisma } from "./lib/db/prisma";

export default async function Home() {
  const links: LinkWithCategoryAndKeywords[] = await prisma.linkItem.findMany({
    include: {
      category: true,
      keywords: true,
    },
  });

  return (
    <main className="">
      <Hero />
      <CardGrid title="Starters" links={links} />
      <TextBlock />
      <FeatureCard />
    </main>
  );
}
