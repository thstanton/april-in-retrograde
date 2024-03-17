import { prisma } from "@/lib/db/prisma";
import BoardForm from "../BoardForm";
import BoardSectionForm from "../BoardSectionForm";

interface BoardEditParams {
  params: {
    id: string;
  };
}

export default async function page({ params }: BoardEditParams) {
  const board = await prisma.board.findUnique({
    where: { id: params.id },
    include: {
      keywords: true,
      sections: { include: { linkItems: true, image: true } },
    },
  });
  const categories = await prisma.category.findMany();
  const linkItems = await prisma.linkItem.findMany({
    include: { category: true, keywords: true },
  });

  return (
    <div>
      {board ? (
        <div>
          <BoardForm board={board} />
          <h1>Sections</h1>
          {board.sections.map((section) => (
            <BoardSectionForm
              key={section.id}
              categories={categories}
              linkItems={linkItems}
            />
          ))}
          <h2>Add Section</h2>
          <BoardSectionForm categories={categories} linkItems={linkItems} />
        </div>
      ) : (
        <div>Board not found</div>
      )}
    </div>
  );
}
