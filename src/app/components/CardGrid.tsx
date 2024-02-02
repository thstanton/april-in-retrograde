import { LinkItem } from "@prisma/client";
import { getCategories } from "../lib/db/categoriesApi";
import FoodCard from "./FoodCard";
import PlayListCard from "./PlaylistCard";

interface CardGridProps {
  links: LinkItem[];
}

export default async function CardGrid({ links }: CardGridProps) {
  const categoryMap = await getCategories();
  return (
    <div className="flex flex-wrap gap-8">
      {links.map((linkItem: LinkItem) =>
        linkItem.categoryId === categoryMap.starter ||
        linkItem.categoryId === categoryMap.main ||
        linkItem.categoryId === categoryMap.dessert ? (
          <FoodCard key={linkItem.id} linkItem={linkItem} />
        ) : (
          <PlayListCard key={linkItem.id} linkItem={linkItem} />
        ),
      )}
    </div>
  );
}
