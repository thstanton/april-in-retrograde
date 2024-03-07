import CardGrid from "@/components/CardGrid";
import FullLinkItem from "@/components/FullLinkItem";
import { authOptions } from "@/lib/auth/authOptions";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";

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
          linkItems: {
            some: {
              id: params.id,
            },
          },
        },
      },
      NOT: {
        id: params.id,
      },
    },
    take: 5,
    include: {
      keywords: true,
      category: true,
    },
  });

  const session = await getServerSession(authOptions);

  return (
    <div>
      {linkItem && <FullLinkItem linkItem={linkItem} />}
      {relatedLinkItems && (
        <CardGrid title="You might also like..." linkItems={relatedLinkItems} userId={session?.user.id}/>
      )}
    </div>
  );
}
