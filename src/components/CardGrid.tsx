import FoodCard from "../../old/FoodCard";
import PlayListCard from "../../old/PlaylistCard";
import { LinkWithCategoryAndKeywords } from "../lib/db/linksApi";
import LinkItemCardSmall from "./LinkItemCardSmall";

interface CardGridProps {
  linkItems: LinkWithCategoryAndKeywords[];
  title: string;
}

export default async function CardGrid({ linkItems, title }: CardGridProps) {
  return (
    <div className="px-6">
      <div className="mb-3 border-b-2 border-solid border-b-blue-900 pb-3">
        <h1 className="font-display text-xl text-blue-900">
          {title.toUpperCase()}
        </h1>
      </div>
      <div className="flex flex-wrap gap-8">
        {linkItems.map((linkItem: LinkWithCategoryAndKeywords) => (
          <LinkItemCardSmall key={linkItem.id} linkItem={linkItem} />
        ))}
      </div>
      <div className="flex justify-center">
        <button className="btn">More</button>
      </div>
    </div>
  );
}
