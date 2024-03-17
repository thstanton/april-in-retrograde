import { Prisma } from "@prisma/client";

export type BoardWithKeywords = Prisma.BoardGetPayload<{
  include: {
    keywords: true;
  };
}>;

export type BoardWithKeywordsSectionsFull = Prisma.BoardGetPayload<{
  include: {
    keywords: true;
    sections: {
      include: {
        linkItems: true;
        image: true;
      };
    };
  };
}>;

export type BoardSectionFull = Prisma.BoardSectionGetPayload<{
  include: {
    linkItems: true;
    image: true;
  };
}>;
