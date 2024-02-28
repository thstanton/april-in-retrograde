import FoodCard from "./FoodCard";
import PlayListCard from "./PlaylistCard";
import { LinkWithCategoryAndKeywords } from "../lib/db/linksApi";

interface CardGridProps {
  links: LinkWithCategoryAndKeywords[];
  title: string;
}

export default async function CardGrid({ links, title }: CardGridProps) {
  return (
    <div className="px-6">
      <div className="mb-3 border-b-2 border-solid border-b-blue-900 pb-3">
        <h1 className="font-display text-xl text-blue-900">
          {title.toUpperCase()}
        </h1>
      </div>
      <div className="flex flex-wrap gap-8">
        {links.map((linkItem: LinkWithCategoryAndKeywords) =>
          linkItem.category.title === "Starter" ||
          linkItem.category.title === "Main" ||
          linkItem.category.title === "Dessert" ? (
            <FoodCard key={linkItem.id} linkItem={linkItem} />
          ) : (
            <PlayListCard key={linkItem.id} linkItem={linkItem} />
          ),
        )}
      </div>
      <div className="flex justify-center">
        <button className="btn">More</button>
      </div>
    </div>
  );
}
