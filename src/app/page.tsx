import CardGrid from "./components/CardGrid";
import FeatureCard from "./components/FeatureCard";
import Hero from "./components/Hero";
import TextBlock from "./components/TextBlock";
import { prisma } from "./lib/db/prisma";

export default async function Home() {
  const links = await prisma.linkItem.findMany()

  return (
    <main className="">
      <Hero />
      <CardGrid title="Starters" links={links} />
      <TextBlock />
      <FeatureCard />
    </main>
  );
}
