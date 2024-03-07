import { LinkWithCategoryAndKeywords } from "../lib/db/linksApi";
import LinkItemCardSmall from "./LinkItemCardSmall";

interface CardGridProps {
  linkItems: LinkWithCategoryAndKeywords[];
  title: string;
  userId?: string;
}

export default async function CardGrid({ linkItems, title, userId }: CardGridProps) {
  return (
    <div className="px-6">
      <div className="mb-3 border-b-2 border-solid border-b-blue-900 pb-3">
        <h1 className="font-display text-xl text-blue-900">
          {title.toUpperCase()}
        </h1>
      </div>
      <div className="mb-3 flex flex-wrap gap-8">
        {linkItems.map((linkItem: LinkWithCategoryAndKeywords) => (
          <LinkItemCardSmall key={linkItem.id} linkItem={linkItem} userId={userId} />
        ))}
      </div>
    </div>
  );
}
