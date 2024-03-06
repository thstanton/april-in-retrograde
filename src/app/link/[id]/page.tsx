import CardGrid from "@/components/CardGrid";
import FullLinkItem from "@/components/FullLinkItem";
import { LinkWithCategoryAndKeywords } from "@/lib/db/linksApi";
import { prisma } from "@/lib/db/prisma";

interface LinkPageProps {
  params: {
    id: string;
  };
}

export default async function page({ params }: LinkPageProps) {
  const linkItem = await prisma.linkItem.findFirst({
    where: {
      id: params.id,
    },
    include: {
      category: true,
      keywords: true,
    },
  });
  const relatedLinkItems = await prisma.linkItem.findMany({
    where: {
      keywords: {
        some: {
          links: {
            some: {
              id: params.id
            }
          }
        }       
      },
      NOT: {
        id: params.id
      }
    },
    take: 5,
    include: {
      keywords: true,
      category: true,
    },
  });

  return (
    <div>
      {linkItem && <FullLinkItem linkItem={linkItem} />}
      {relatedLinkItems && (
        <CardGrid title="You might also like..." linkItems={relatedLinkItems} />
      )}
    </div>
  );
}
