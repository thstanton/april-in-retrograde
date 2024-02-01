import { prisma } from "../lib/db/prisma";
import NewLinkForm from "./NewLinkForm";
import NewKeywordForm from "./NewKeywordForm";

export default async function page() {
  const categories = await prisma.category.findMany();
  const keywords = await prisma.keyword.findMany();

  return (
    <div className="p-6">
      <h1 className="text-xl">New link:</h1>
      <NewLinkForm categories={categories} keywords={keywords} />
      <NewKeywordForm />
    </div>
  );
}
