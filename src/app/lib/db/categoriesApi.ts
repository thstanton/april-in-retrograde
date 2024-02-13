import { prisma } from "./prisma";

export interface CategoryMap {
  [index: string]: string;
}

export async function getCategories() {
  const categoryArr = await prisma.category.findMany();
  const categoryMap: CategoryMap = {};
  categoryArr.forEach(
    (category) => (categoryMap[category.title.toLowerCase()] = category.id),
  );
  return categoryMap;
}
