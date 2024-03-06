import { Prisma } from "@prisma/client";

export type LinkWithCategoryAndKeywords = Prisma.LinkItemGetPayload<{
  include: {
    category: true;
    keywords: true;
  };
}>;
