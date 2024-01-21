import { prisma } from "@/app/lib/db/prisma";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { URL, title, description, imageURL, site, keywordIds, categoryId } =
      data;
    await prisma.link.create({
      data: {
        URL: URL,
        title: title,
        description: description,
        imageURL: imageURL,
        site: site,
        keywordIds: keywordIds,
        categoryId: categoryId,
      },
    });
    return Response.json({ status: 200 });
  } catch (error) {
    return Response.json({ status: 400 });
  }
}
