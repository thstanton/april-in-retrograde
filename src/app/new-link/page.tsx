import { prisma } from "../lib/db/prisma";
import LinkForm from "./LinkForm";

export default async function page() {
  const categories = await prisma.category.findMany();
  const keywords = await prisma.keyword.findMany();

  return (
    <div className="p-6">
      <LinkForm categories={categories} keywords={keywords} />
    </div>
  );
}
