import { LinkItem } from "@prisma/client";
import { getCategories } from "../lib/db/categoriesApi";
import FoodCard from "./FoodCard";
import PlayListCard from "./PlaylistCard";

interface CardGridProps {
  links: LinkItem[];
  title: string;
}

export default async function CardGrid({ links, title }: CardGridProps) {
  const categoryMap = await getCategories();
  const titleUpper = title.toUpperCase()

  return (
    <div>
      <div className="border-b-blue-900 border-b-2 border-solid mb-3 pb-3">
        <h1 className="font-display text-xl text-blue-900">{titleUpper}</h1>
      </div>
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
    </div>
  );
}
