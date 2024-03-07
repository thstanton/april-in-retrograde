import { getServerSession } from "next-auth";
import CardGrid from "../components/CardGrid";
import FeatureCard from "../components/FeatureCard";
import Hero from "../components/Hero";
import TextBlock from "../components/TextBlock";
import { LinkWithCategoryAndKeywords } from "../lib/db/linksApi";
import { prisma } from "../lib/db/prisma";
import { authOptions } from "@/lib/auth/authOptions";

export default async function Home() {
  const linkItems: LinkWithCategoryAndKeywords[] =
    await prisma.linkItem.findMany({
      include: {
        category: true,
        keywords: true,
      },
    });
  const session = await getServerSession(authOptions);

  return (
    <main className="">
      <Hero />
      <CardGrid
        title="Starters"
        linkItems={linkItems}
        userId={session?.user.id}
      />
      <TextBlock />
      <FeatureCard />
    </main>
  );
}
